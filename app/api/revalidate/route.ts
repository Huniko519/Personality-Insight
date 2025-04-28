import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get("path")
    const tag = searchParams.get("tag")
    const all = searchParams.get("all")

    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        revalidated: true,
        message: `Path ${path} revalidated.`,
      })
    }

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        revalidated: true,
        message: `Tag ${tag} revalidated.`,
      })
    }

    if (all) {
      // Revalidate common paths
      revalidatePath("/")
      revalidatePath("/admin")
      revalidatePath("/profile")
      revalidatePath("/blog")
      revalidatePath("/types")

      // Revalidate common tags
      revalidateTag("blogs")
      revalidateTag("personality-types")
      revalidateTag("questions")
      revalidateTag("case-studies")
      revalidateTag("careers")

      return NextResponse.json({
        revalidated: true,
        message: "All paths and tags revalidated.",
      })
    }

    return NextResponse.json({ error: "No path or tag provided for revalidation" }, { status: 400 })
  } catch (error) {
    console.error("Error during revalidation:", error)
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 })
  }
}
