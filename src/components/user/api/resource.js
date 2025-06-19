import {useMutation, useQuery} from "@tanstack/react-query";

export function useDownloadImageToSchoolCd(schoolCd) {
    return useQuery({
        queryKey: ['/resource/download', schoolCd],
        queryFn: async () => {
            return await api.get(`/resource/download/${schoolCd}`);
        }
    })
}

// 이미지 업로드
export function useUploadImageMutation() {
    return useMutation({
        mutationFn: async (param) => {
            const { image, layoutCd, eventCd, imageSeq, schoolCd } = param;
            const formData = new FormData();
            image.forEach((file) => {
                formData.append('image', file);
            });
            formData.append('layoutCd', layoutCd);
            formData.append('eventCd', eventCd);
            formData.append('imageSeq', imageSeq);
            formData.append('schoolCd', schoolCd);

            return (await api.post(`/resource/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data;
        }
    });
}

// 이미지 삭제
export function useDeleteResourceMutation() {
    return useMutation({
        mutationFn: async (param) => {
            return (await api.delete(`/resource/delete`, param)).data;
        }
    })
}