import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { Task } from "../../../../rest-api/types"
import { SerializedError } from "@reduxjs/toolkit"

export type Data = { data: Task }
export type Error = { error: FetchBaseQueryError | SerializedError }