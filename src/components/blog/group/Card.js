import Card from "components/utils/card"
import Icon from "components/utils/field/Icon"
import { Col } from "components/utils/grid"
import Link from "components/utils/link"
import Popconfirm from "components/utils/popconfirm"
import { deleteBlogGroup } from "store/actions/blog"
import { API_BASE_URL } from "tools/shared/constants"

function CardItem({ item, loading }) {
    const children = [
        { title: "isIndex: ", value: item.isIndex ? <span className="approved" /> : <span className="unapproved" /> },
        { title: "isFollow: ", value: item.isFollow ? <span className="approved" /> : <span className="unapproved" /> },
    ]

    return (
        <Col xs={24} sm={12}>
            <Card
                key={item.id}
                title={`نام: ${item.name}`}
                cover={<img src={`${API_BASE_URL}${item.piclink}`} width="40" height="40" alt="تصویر" />}
                loading={loading}
                actions={[
                    <div className="actions">
                        <Link
                            to={`./edit/${item.id}`}
                            title="ویرایش"
                        >
                            <Icon key="edit" type="edit" />
                        </Link>
                        <Popconfirm
                            title={`آیا از حذف گروه کد "${item.id} "اطمینان دارید؟`}
                            onConfirm={() => deleteBlogGroup({ id: item.id })}
                        >
                            <Icon key="delete" type="delete" />
                        </Popconfirm>
                    </div>
                ]}
            >
                <ul>
                    {children.map((child, index) => (
                        <li key={`${index}_${child.value}`}>
                            <span className="bold">{child.title}</span>
                            {child.value}
                        </li>
                    ))}
                </ul>
            </Card>
        </Col>
    )
}

export default CardItem
