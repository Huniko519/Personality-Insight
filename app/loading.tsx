import { memo } from "react"
import { Loading } from "@/components/loading"

const HomeLoading = memo(() => <Loading />)

HomeLoading.displayName = 'HomeLoading'

export default HomeLoading
