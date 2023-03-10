import useSWR from "swr"
import categoriesService, { CategoryOnDemmand } from "../../../services/categoriesService"
import SpinnerComponent from "../../common/spinner"
import ListCategoriesSlide from "../listCategoriesSlide"

const ListCategory = () =>{
    const { data, error } = useSWR('/getOnDemmand', categoriesService.getOnDemmand)

    if (error) return error
    if (!data) return (<SpinnerComponent />)

    return (
        ('content' in data.data && data.data.content instanceof Array<CategoryOnDemmand>) ? 
            <>{data.data.content.map(category => (
                <div key={category.id}>
                    <ListCategoriesSlide key={category.id} categoryId={category.id} categoryName={category.name}/>
                </div>
            ))}</> : 
            <></>
    )
}

export default ListCategory