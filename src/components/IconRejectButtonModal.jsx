import React from "react";
import TableActionButton from "./TableActionButton";
import {Typography} from "@mui/material";
import MessageModal from "./modal/MessageModal";
import useModal from "../hooks/useModal";

const IconRejectButtonModal = ({message, title, showDescription=true}) => {

    const {
        isOpen: isMessageOpen,
        openModal: openMessageModal,
        closeModal: closeMessageModal,
        modalData: messageModalData
    } = useModal();

    const limitCharacter = (value) => {
        let message = value?.substring(0, 15)
        if(value?.length > 15) {
            message += '...'
        }
        return message
    }

    return (
        <>
            <Typography display={'flex'} justifyContent={'center'} alignItems={"center"}>
                {
                    showDescription && <p
                        style={{
                            scrollBehavior: 'smooth',
                            display: 'inline-block',
                            unicodeBidi: 'plaintext',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {limitCharacter(message)?.split('%')
                            .join('percent')
                            .replace(/percent/g, ' % ')}
                    </p>
                }
                <TableActionButton
                    onClick={() => openMessageModal(message)}
                    type={'reject'}
                    title={title}
                    sx={{width: '20px', height: '20px', ml: 5}}
                />
            </Typography>
            {
                isMessageOpen && <MessageModal state={isMessageOpen} handleClose={closeMessageModal} data={messageModalData} title={title}/>
            }
        </>
    )
}

export default IconRejectButtonModal