import FormInput from "components/utils/form/items/FormInput"
import FormSelect from "components/utils/form/items/FormSelect"
import { ColumnGrid } from "components/utils/grid"

export default function Specifications() {
    return (
        <>
            <h1>مشخصات</h1>
            <ColumnGrid>
                <FormInput
                    label="ترتیب نمایش"
                    name="sort"
                />
                <FormInput
                    label="پیوند یکتا"
                    name="slug"
                />
                <FormSelect
                    label="فعال "
                    name="IsDeactive"
                    items={[
                        {
                            text: "خیر",
                            value: true
                        },
                        {
                            text: "بلی",
                            value: false
                        },
                    ]}
                />
                <FormSelect
                    label="قابل فروش "
                    name="salable"
                    items={[
                        {
                            text: "خیر",
                            value: false
                        },
                        {
                            text: "بلی",
                            value: true
                        },
                    ]}
                />
                <FormSelect
                    label="واحد "
                    name="unit"
                    required={true}
                    items={[
                        {
                            text: "عدد",
                            value: 1
                        },
                        {
                            text: "جعبه",
                            value: 2
                        },
                    ]}
                />
            </ColumnGrid>
            <ColumnGrid>
                <FormInput
                    label="وزن (گرم)"
                    name="weight"
                    required={true}
                />
                <FormInput
                    label="طول (سانتی متر)"
                    name="length"

                />
                <FormInput
                    label="عرض (سانتی متر)"
                    name="width"

                />
                <FormInput
                    label="ارتفاع (سانتی متر)"
                    name="heigth"

                />
                <FormInput
                    label="شماره مجوز"
                    name="licenseNumber"

                />
            </ColumnGrid>
        </>
    )
}
