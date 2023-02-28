import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

interface Color {
  id: number;
  name: string;
  year: string;
  color: string;
  pantone_value: string;
}

interface ColorResponse {
  data: Color[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Colors: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") ?? "1");
  const initialPer_page = parseInt(searchParams.get("per_page") ?? "10");

  const navigate = useNavigate();

  const [colors, setColors] = useState<Color[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPer_page);
  const [totalColors, setTotalColors] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const debouncedPage = useDebounce(page, 2000);
  const debouncedPerPage = useDebounce(perPage, 2000);

  useEffect(() => {
    async function fetchColors() {
      const data = await fetch(
        `https://reqres.in/api/colors?page=${debouncedPage}&per_page=${debouncedPerPage}`
      );
      const response = await data.json();

      if (response === undefined || response.error) {
        throw new Error(`HTTP error! status: ${response.error}`);
      }

      const colorResponse = response as ColorResponse;
      setColors(colorResponse.data);
      setTotalColors(colorResponse.total);
      setTotalPages(colorResponse.total_pages);
    }

    fetchColors();
  }, [debouncedPage, debouncedPerPage]);

  return (
    <div>
      <h1>Colors List</h1>
      <div>
        <span>Page: {page}</span>
        <span> </span>
        <button
          onClick={() => {
            if (page === 1) {
              return;
            }
            setPage(page - 1);
            navigate(`?page=${page - 1}&per_page=${perPage}`, {
              replace: true,
            });
          }}
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            if (page === totalPages) {
              return;
            }
            setPage(page + 1);
            navigate(`?page=${page + 1}&per_page=${perPage}`, {
              replace: true,
            });
          }}
        >
          {">"}
        </button>
        {" | "}
        <span>Per Page: {perPage}</span>
        <span> </span>
        <button
          onClick={() => {
            if (perPage === 1) {
              return;
            }
            setPerPage(perPage - 1);
            navigate(`?page=${page}&per_page=${perPage - 1}`, {
              replace: true,
            });
          }}
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            if (perPage === totalColors) {
              return;
            }
            setPerPage(perPage + 1);
            navigate(`?page=${page}&per_page=${perPage + 1}`, {
              replace: true,
            });
          }}
        >
          {">"}
        </button>
      </div>
      {colors.map((_color, index) => {
        return <div key={index}>{_color.name}</div>;
      })}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Colors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
