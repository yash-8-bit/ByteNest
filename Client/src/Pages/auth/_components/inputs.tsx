import TextField from "@mui/material/TextField"
import { tc } from "../../../components/style/main"


type Props = {
    value: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement, Element>
}

export const NameInput = ({
    value,
    onChange
}: Props) => {
    return (
        <TextField required className={`w-full ${tc}`}
            size="small" name="name" type="text"
            value={value}
            onChange={onChange}
            slotProps={{
                htmlInput: {
                    minLength: 3,
                    maxLength: 20
                }
            }}
            label={"Enter name"} variant="outlined" />
    )
}

export const UserNameInput = ({
    value,
    onChange
}: Props) => {
    return (
        <TextField required className={`w-full ${tc}`}
            size="small" name="username"
            type="text"
            value={value}
            onChange={onChange}
            slotProps={{
                htmlInput: {
                    minLength: 3,
                    maxLength: 15
                }
            }}
            label={"Enter username"} variant="outlined" />

    )
}