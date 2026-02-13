import { SummaryPeriod } from "@/constants/summaryPeriod";
import {z} from "zod"


export const summaryPeriodSchema = z.enum(SummaryPeriod)