import {IconButton} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomPagination = ({page, setPage, total, rowsPerPage}) => {
    // 전체 페이지 수
    const totalPages = Math.ceil(total / rowsPerPage);
    // 페이지 번호 배열
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center gap-4 py-6">
            <IconButton
                onClick={() => setPage(page > 0 ? page - 1 : 0)}
                disabled={page === 0}
                size="small"
            >
                <ArrowBackIosNewIcon fontSize="small"/>
            </IconButton>
            {pages.map((p) => (
                <button
                    key={p}
                    type="button"
                    className={
                        (p - 1 === page
                            ? "bg-[#377dff] shadow text-white "
                            : "text-gray-800 hover:text-[#377dff] ") +
                        "rounded-full w-9 h-9 flex items-center justify-center text-base font-medium transition-all"
                    }
                    style={{
                        margin: "0 0.25rem",
                        boxShadow: p - 1 === page ? "0 2px 8px 0 rgba(55,125,255,0.14)" : undefined,
                    }}
                    onClick={() => setPage(p - 1)}
                >
                    {p}
                </button>
            ))}
            <IconButton
                onClick={() => setPage(page < totalPages - 1 ? page + 1 : page)}
                disabled={page === totalPages - 1}
                size="small"
            >
                <ArrowForwardIosIcon fontSize="small"/>
            </IconButton>
        </div>
    );
}
export default CustomPagination;