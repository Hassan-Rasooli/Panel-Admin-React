import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { createManualOrderWarehouseExitRecord, getManualOrderTypeList, manualOrderWarehouseExitLastOrder } from 'store/actions/manualOrder'
import { getBrandWithProduct } from 'store/actions/product'
import {
    MANUAL_ORDER_WAREHOUSE_EXIT_LAST_ORDER as lastOrderEntity,
    BRAND_WITH_PRODUCT_LIST as brandWithProductEntity,
    MANUAL_ORDER_TYPE as manualOrderTypeEntity,
} from "tools/utils/entities"
import { checkFilters } from 'tools/utils'
import Form from 'components/utils/form'
import { ColumnGrid, Row } from 'components/utils/grid'
import FormInput from 'components/utils/form/items/FormInput'
import { FormSelect } from 'components/utils/form/items/FormSelect'
import { postList } from 'tools/shared/constants'
import Radio from 'components/utils/field/radio'
import { FormDatePicker } from 'components/utils/form/items/FormDatePicker'
import { FormInputNumber } from 'components/utils/form/items/FormInputNumber'
import MultiSelectProduct from 'components/utils/multiSelectProduct/SelectWithTransfer'
import MultiSelectProvince from 'components/utils/multiSelectProvince/SelectWithTransfer'
import Collapse from 'components/utils/collapse'
import FormSelectSearch from 'components/utils/form/items/FormSelectSearch'
import ButtonWithConfirm from 'components/utils/formAction/ButtonWithConfirm'

export default function Create() {
    const fieldCol = { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 }
    const [recordType, setRecordType] = useState(1)
    const [productSelect, setProductSelect] = useState([])
    const [productFilterType, setProductFilterType] = useState(true)

    const [provinceSelect, setProvinceSelect] = useState([])
    const [provinceFilterType, setProvinceFilterType] = useState(true)
    let navigate = useNavigate()

    const { data: lastOrder } = useSelector(
        (s) => s[lastOrderEntity.name]
    )

    const { data: branWithProduct, loading } = useSelector(
        (s) => s[brandWithProductEntity.name]
    )

    const { data: manualOrderType } = useSelector(
        (s) => s[manualOrderTypeEntity.name]
    )

    useEffect(() => {
        manualOrderWarehouseExitLastOrder()
        getManualOrderTypeList()
        if (branWithProduct.length === 0) getBrandWithProduct()
    }, [])

    const type = [{ text: "??????", value: "" }]

    for (const item of manualOrderType) {
        type.push({
            text: item.title,
            value: item.ID
        })
    }

    const onFinish = (values) => {
        let cleanFormat = checkFilters({ ...values })
        let serviceField = {
            ...cleanFormat,
            proFilterWareHouse: {}
        }

        if (productSelect.length) {
            if (productFilterType) {
                serviceField.proFilterWareHouse.onlyThisProductIDs = productSelect
            } else {
                serviceField.proFilterWareHouse.exceptThisProductIDs = productSelect
            }
        }

        if (provinceSelect.length) {
            if (provinceFilterType) {
                serviceField.proFilterWareHouse.onlyThisProvinceIDs = provinceSelect
            } else {
                serviceField.proFilterWareHouse.exceptThisProvinceIDs = provinceSelect
            }
        }
        createManualOrderWarehouseExitRecord(serviceField)
        navigate(-1)
    }

    return (
        <div className="section-card">
            <h3>???????? ???????? ????????????????? ???? ???? ???????? ???? ????????????<span className='accent bold'> ?????????? </span>??<span className='accent bold'> ?????????? ?????????? </span>???? ???????????? ????????. ???? ?????????? ????????????????????? ???? <span className='warning bold'>????????????????????? ??????????????????? ???????????????????</span>?? ???? ???? ???????? ???? ?????????? ???????????? ?????????????????.</h3>
            {(lastOrder.ID) ?
                <h3>???? ?????????? ?????????? ?????????????? ???????? <span className='accent bold'>{lastOrder.ID}</span> ?? ?????????? ???? <span className='accent bold'>{lastOrder.orderDateTime}</span> ??????.</h3>
                : <h3>?????????? ?????????????? ???????? ???? ???????? ??????.</h3>
            }
            <h2>?????? ?????????? :</h2>
            <Radio
                name='recordType'
                label="?????? ??????????"
                onChange={({ target: { value } }) => setRecordType(value)}
                value={recordType}
                options={[
                    {
                        value: 1,
                        label: "???????????? ??????????",
                    }, {
                        value: 2,
                        label: "???????????? ???? ??????????"
                    }
                ]}
            />
            <Form
                name="EditForm"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                    pageSize: 200,
                    countProductsRecords: 0,
                    TypeID: "",
                    postCompanyID: "1"
                }}
            >
                {(recordType === 1) ?
                    <Row className="edit-form">
                        <ColumnGrid col={fieldCol}>
                            <FormSelect
                                name="postCompanyID"
                                label="??????"
                                items={[
                                    ...postList
                                ]}
                                required={true}
                            />
                            <FormDatePicker
                                name="orderDateFrom"
                                label="?????????? ????"
                                required={true}
                            />
                            <FormDatePicker
                                name="orderDateTo"
                                label="?????????? ????"
                                required={true}
                            />
                            <FormInputNumber
                                name="pageSize"
                                label="??????????"
                                min={1} max={200}
                            />
                            <FormInputNumber
                                name="countProductsRecords"
                                label="?????????? ?????????? ?????????? ???? ??????????"
                                min={0} max={200}
                            />
                            <FormSelectSearch
                                name="TypeID"
                                label="??????"
                                items={type}
                            />
                        </ColumnGrid>
                        <Collapse title="?????????? ??????????">
                            <Radio
                                name='productFilterType'
                                label="?????? ?????????? ????????????"
                                onChange={({ target: { value } }) => setProductFilterType(value)}
                                value={productFilterType}
                                options={[
                                    {
                                        value: true,
                                        label: "???????? ????????????",
                                    }, {
                                        value: false,
                                        label: "???????? ????????????"
                                    }
                                ]}
                            />
                            <MultiSelectProduct value={productSelect} onChange={setProductSelect} />
                        </Collapse>
                        <Collapse title="?????????? ??????????">
                            <Radio
                                name='productFilterType'
                                label="?????? ?????????? ??????????"
                                onChange={({ target: { value } }) => setProvinceFilterType(value)}
                                value={provinceFilterType}
                                options={[
                                    {
                                        value: true,
                                        label: "???????? ??????????",
                                    }, {
                                        value: false,
                                        label: "???????? ??????????"
                                    }
                                ]}
                            />
                            <MultiSelectProvince value={provinceSelect} onChange={setProvinceSelect} />
                        </Collapse>

                    </Row>
                    :
                    <Row className="edit-form">
                        <ColumnGrid col={fieldCol}>
                            <FormInput
                                name='orderFrom'
                                label='?????????? ??????????'
                                required={true}
                            />
                        </ColumnGrid>
                    </Row>
                }
                <ButtonWithConfirm loading={loading} />
            </Form>
        </div>
    )
}