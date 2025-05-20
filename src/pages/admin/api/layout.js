import {useMutation, useQuery} from "@tanstack/react-query";
import api from "../../../lib/app.js";

// 학교코드로 레이아웃 목록
export function useGetLayoutList(schoolCd) {
    return useQuery({
        queryKey: ['/event/event-table-list', schoolCd],
        queryFn: async () => {
            return await api.get(`/event/event-table-list/test/${schoolCd}`);
        }
    })
}

export function useGetEventList(schoolCd, layoutCd) {
    return useQuery({
        queryKey: ['/event/event-list', schoolCd, layoutCd],
        queryFn: async () => {
            return await api.get(`/event/event-list/test/school-cd/${schoolCd}/layout-cd/${layoutCd}`);
        }
    })
}

export function useGetEventSessionList(SearchEventListDto) {
    return useQuery({
        queryKey: ['/event/event-session', SearchEventListDto],
        queryFn: async () => {
            return await api.get(`/event/event-session/test`);
        }
    })
}

export function useGetReservationList(userId) {
    return useQuery({
        queryKey: ['/event/user-event-session', userId],
        queryFn: async () => {
            return await api.get(`/event/user-event-session/${userId}`);
        }
    })
}


export function useEventSessionListMutation() {
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/event/event-session/user-id/test`, param)).data;
        }
    })
}

export function useCreateEventSessionListMutation(userId) {
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/event/event-session/user-id/${userId}`, param)).data;
        }
    })
}

export function useDeleteEventSessionListMutation() {
    return useMutation({
        mutationFn: async (param) => {
            return (await api.delete(`/event/event-session/user-id/test`, param)).data;
        }
    })

}