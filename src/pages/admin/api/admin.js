import {useMutation, useQuery} from "@tanstack/react-query";

// 예약 내역 조회(학교별)
export function useGetReservationList(schoolCd) {
    return useQuery({
        queryKey: ['/admin/admin/schoolCd', schoolCd],
        queryFn: async () => {
            return await api.get(`/admin/schoolCd/${schoolCd}`);
        }
    })
}

// 엑셀다운로드
export function useReservationExcelDownload(schoolCd) {
    return useQuery({
        queryKey: ['/admin/download-excel/schoolCd', schoolCd],
        queryFn: async () => {
            return await api.get(`/admin/download-excel/schoolCd/${schoolCd}`);
        }
    })
}

// 엑셀 양식 다운로드
export function useReservationTemplateExcelDownload() {
    return useQuery({
        queryKey: ['/admin/download-excel-template'],
        queryFn: async () => {
            return await api.get(`/admin/download-excel-template`);
        }
    })
}

// 학교코드 생성/저장
export function useCreateSchoolCdMutation() {
    return useMutation({
        mutationFn: async (typeCd, param) => {
            return (await api.post(`/admin/schoolCd/test/${typeCd}`, param)).data;
        }
    })
}

// 예약 내역 엑셀업로드
export function useReservationExcelUploadMutation(schoolCd) {
    return useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append('file', file);

            return (await api.post(`/admin/upload/${schoolCd}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data;
        }
    });
}


/////////////////////////////////// admin 이벤트 수정

// 학교코드 생성/저장
export function useCreateLayoutListMutation() {
    return useMutation({
        mutationFn: async (typeCd, param) => {
            return (await api.post(`/admin/layout/test`, param)).data;
        }
    })
}

// 이벤트 테이블 삭제
export function useDeleteLayoutListMutation() {
    return useMutation({
        mutationFn: async (typeCd, param) => {
            return (await api.delete(`/admin/layout/test`, param)).data;
        }
    })
}


// 이벤트 추가(블록추가)/수정
export function useCreateEventListMutation() {
    return useMutation({
        mutationFn: async (typeCd, param) => {
            return (await api.post(`/admin/event-list/test`, param)).data;
        }
    })
}


// 이벤트 삭제
export function useDeleteEventListMutation() {
    return useMutation({
        mutationFn: async (typeCd, param) => {
            return (await api.delete(`/admin/event-list/test`, param)).data;
        }
    })
}


