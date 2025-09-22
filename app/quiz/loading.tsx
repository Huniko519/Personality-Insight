import { memo } from "react"
import { Loading } from "@/components/loading"

const QuizLoading = memo(() => <Loading />)

QuizLoading.displayName = 'QuizLoading'

export default QuizLoading
