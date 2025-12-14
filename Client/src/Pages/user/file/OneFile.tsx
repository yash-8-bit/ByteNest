import { Link, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { CiFileOn } from "react-icons/ci";
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { ApiFunction } from '../../../utils/apifunction.util';
import { getOneFile } from '../../../api/userfile.api';
import type { UserFileType } from '../../../types/user.type';
import Loading from '../../../components/MyLoading';
import bghome from "../../../assets/bg-home.webp"
function OneFile() {
  const [data, setData] = useState<UserFileType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  async function getFile() {
    await ApiFunction({
      callback: async () => {
        const data = await getOneFile(token!);
        setData(data.data)
      },
      setLoading: setLoading,
      onerror: () => {
        navigate("/");
      }
    })
  }
  useEffect(() => {
    if (!token) navigate("/");
    else getFile();
  }, [])
  const getDownloadUrl = (url: string | undefined) => {
    if (!url) return "";
    return url.replace("/upload/", `/upload/fl_attachment/`);
  };
  return (
    <>   {loading && <Loading />}
      <div className='h-screen flex-col  justify-center flex items-center'
        style={{ backgroundImage: `url(${bghome})` }}
      >
        <Link to={"/"} className='badge'>Byte-Nest</Link>
        <div className='m-2  hover:-translate-y-1  group ring-1 duration-300 ring-gray-900/5 transition-all  shadow-xl hover:shadow-2xl w-full bg-white  sm:w-96'>
          <div
            className=" relative cursor-pointer
              overflow-hidden  px-6 pt-10 pb-2
          sm:mx-auto sm:max-w-sm
          sm:px-10">
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10 mx-auto max-w-md">
              <span className='grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400'>
                <CiFileOn size={40} />
              </span>
              <div
                className="pt-5 font text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p className=''>
                  file name - {data?.name}
                </p>
                <p className=''>
                  file type - {data?.filetype}
                </p>
                <p className=' font-bold underline underline-offset-2'>
                  Shared by - {data?.username}
                </p>
              </div>
            </div>
          </div>
          <div className="p-2  w-full text-base font-semibold leading-7">
            <a
              href={getDownloadUrl(data?.url)}
            >
              <Button className='w-full' variant="outlined" startIcon={<DownloadIcon />} >
                Download
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default OneFile