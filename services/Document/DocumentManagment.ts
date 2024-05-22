import { Dispatch } from 'redux';
import axios from 'axios';
import { axiosConfig } from '@/config/axiosConfig';
import axiosClient from '@/config/axiosClient';
import { Stack } from '@/types/ReduxTypes';
import { addElement } from '@/redux/slices/stackSlice';
import { errorHandler } from '@/utils/errorHandler';



type CreateDocumentProps = {
    file: File;
    directoryId: string;
    userId: string;
    dispatch: Dispatch<any>;
};

interface ResponseUpload {
    document_id: string;
    msg: string;
    user_id: string;
}

export async function CreateDocument({ file, directoryId, userId, dispatch }: CreateDocumentProps): Promise<ResponseUpload | null> {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("directory_id", directoryId);
        formData.append("userId", userId);

        const config = axiosConfig(true);
        if (!config) return null;

        const response = await axiosClient.post<ResponseUpload>(
            "/document/upload_document",
            formData,
            config,
        );

        const newStack: Stack = {
            name: file.name,
            id: response.data.document_id,
            cargado: true,
        };

        dispatch(addElement(newStack));
        return response.data;
    } catch (err: any) {
        errorHandler(err);
        return null;
    }
}

