import {useMutation, useQuery} from "@tanstack/react-query";
import api from "../../../lib/app.js";

// 예시
export function useSignInQuery(id, password) {
    return useQuery({
        queryKey: [id, password],
        queryFn: async () => {
            return await api.get('/auth/sign-in');
        }
    })
}

// 사용자 회원가입
export function useStudentSignUpMutation(uuid) {
    // const queryClient = useQueryClient(); // 캐시 갱신할 때 사용(캐시 + 컴포넌트 재랜더링)
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/auth/sign-up/student?uuid=${uuid}`, param)).data;
        },
        onSuccess: () => {
            // queryClient.invalidateQueries(['sign-in']); // 해당 쿼리키를 가진 쿼리가 갱신됨
        }
    })
}

// 관리자 회원가입
export function useAdminSignUpMutation(uuid) {
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/auth/sign-up/admin?uuid=${uuid}`, param)).data;
        }
    })
}

// 로그인
export function useSignInMutation() {
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/auth/sign-in`, param)).data;
        }
    })
}

// 핸드폰 인증번호 생성/발송
export function useCreateCodsMutation() {
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/auth/create-code`, param)).data;
        },
        onSuccess: () => {
            // queryClient.invalidateQueries(['validate-code-check']); // 휴대폰 인증 여부 갱신
        }
    })
}

// 휴대폰 인증번호 검증/uuid 반환
export function useValidationCodeMutation() {
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/auth/validate-code`, param)).data;
        }
    })
}

// 인증여부(10분 카운트)
export function useValidationCodeCheck(){
    return useMutation({
        mutationFn: async (param) => {
            return (await api.post(`/auth/validate-code-check`, param)).data;
        }
    })
}