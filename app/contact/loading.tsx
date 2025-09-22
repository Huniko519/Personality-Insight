import { memo } from "react"
import { Loading } from "@/components/loading"

const ContactLoading = memo(() => <Loading />)

ContactLoading.displayName = 'ContactLoading'

export default ContactLoading
