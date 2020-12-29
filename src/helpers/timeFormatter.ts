import moment, { MomentInput } from "moment"

export const timeFormatter = (time: MomentInput): String => {
    return moment(time).format('h:mm a');
}