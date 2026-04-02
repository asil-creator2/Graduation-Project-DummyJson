import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {setCategory} from '../../Redux/categorySlice'
const Category = () => {
    const [categories,setCategories] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategory = async () => {
            const response = await fetch('https://dummyjson.com/products/category-list')
            const data = await response.json()
            setCategories(data)
        }
        getCategory()
    } , [])
  return (
    <div>
      <select
        onChange={e => {dispatch(setCategory(e.target.value))}}
        className="px-4 py-2.5 pr-10 rounded-full border border-gray-300 dark:border-slate-600 
            bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            appearance-none cursor-pointer transition-all duration-200"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.25rem',
        }}
        >
        <option value='all'>All</option>
        {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
        ))}
        </select>
    </div>
  )
}

export default Category
