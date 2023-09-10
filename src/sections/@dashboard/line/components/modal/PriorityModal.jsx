import BaseStyleModal from "../../../../../components/modal/BaseStyleModal";
import {Button, Stack} from "@mui/material";
import CustomMenuItem from "../../../../../components/CustomMenuItem";
import {useForm} from "react-hook-form";
import {FormProvider, RHFSelect} from "../../../../../components/hook-form/index.jsx";
import {useTheme} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";
import {editPriority} from "src/services/lines/lineUsers";
import {useSnackbar} from "notistack";
import {useQueryClient} from "@tanstack/react-query";


const PriorityModal = ({state, handleClose, data}) => {
    const queryClient = useQueryClient()
    const theme = useTheme()
    const methods = useForm({
        defaultValues: {
            priority: data.priority
        }
    });
    const {enqueueSnackbar} = useSnackbar()
    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        const response = await editPriority(data.id, values.priority)
        if (response.isSuccess) {
            enqueueSnackbar(response.message)
            queryClient.invalidateQueries(['LineList'])
            handleClose()
        }
    };

    return (
        <BaseStyleModal
            show={state}
            handleClose={() => handleClose()}
            title={'اولویت'}
            mdWidth={300}
            lgWidth={400}
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFSelect name="priority" label="الویت">
                    {Array.from(Array(9).keys()).map((data) => (
                            <CustomMenuItem key={data} value={data}>
                                {data}
                            </CustomMenuItem>
                        ))}
                </RHFSelect>
                <Stack sx={{mt: 6}} flexDirection={'row'} justifyContent={'flex-end'}>
                    <Button
                        size="large"
                        sx={{
                            minHeight: 36,
                            maxHeight: 36,
                            minWidth: 84,
                            color: theme.palette.text.disabled,
                            borderColor: theme.palette.text.disabled,
                            marginRight: 1,
                            border: 'none',
                            ':hover': {
                                color: theme.palette.grey[100],
                                backgroundColor: theme.palette.grey[700],
                            },
                        }}
                        color={'inherit'}
                        variant="outlined"
                        onClick={() => handleClose()}
                    >
                        انصراف
                    </Button>
                    <LoadingButton
                        sx={{minHeight: 36, maxHeight: 36, minWidth: 84}}
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        ذخیره
                    </LoadingButton>
                </Stack>
            </FormProvider>

        </BaseStyleModal>
    )
}
export default PriorityModal