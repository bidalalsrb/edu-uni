// src/store/layoutStore.js
import {create} from "zustand";

const useLayoutStore = create((set, get) => ({
    boxes: [],
    rowCount: 5,
    colCount: 8,

    // 초기 레이아웃을 로컬 스토리지에서 불러오는 함수 (사용자 ID 필요)
    initializeLayout: (userId) => {
        const savedLayout = localStorage.getItem("layout_" + userId);
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            // Date 변환이 필요한 경우 추가 처리
            const boxes = (layout.boxes || []).map((box) => {
                if (box.applications && Array.isArray(box.applications)) {
                    box.applications = box.applications.map((app) => ({
                        ...app,
                        startTime: app.startTime ? new Date(app.startTime) : null,
                        endTime: app.endTime ? new Date(app.endTime) : null,
                    }));
                }
                return box;
            });
            set({
                boxes,
                rowCount: layout.rowCount || 5,
                colCount: layout.colCount || 8,
            });
        }
    },

    // 박스 전체를 업데이트
    setBoxes: (boxes) => set({boxes}),
    // 새 박스 추가
    addBox: (box) =>
        set((state) => ({
            boxes: [...state.boxes, box],
        })),
    // 특정 박스 업데이트
    updateBox: (updatedBox) =>
        set((state) => ({
            boxes: state.boxes.map((box) =>
                box.id === updatedBox.id ? updatedBox : box
            ),
        })),
    // 특정 박스 제거
    removeBox: (boxId) =>
        set((state) => ({
            boxes: state.boxes.filter((box) => box.id !== boxId),
        })),

    setRowCount: (rowCount) => set({rowCount}),
    setColCount: (colCount) => set({colCount}),

    // 현재 레이아웃을 로컬 스토리지에 저장 (사용자 ID 필요)
    saveLayout: (userId) => {
        const {boxes, rowCount, colCount} = get();
        const layoutData = {boxes, rowCount, colCount};
        localStorage.setItem("layout_" + userId, JSON.stringify(layoutData));
    },
}));

export default useLayoutStore;
