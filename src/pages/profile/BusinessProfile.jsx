// import AnimatedCard from '@/components/cards/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getUser } from '@/services/user';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import DownloadPdf from '@/assets/icons/download-pdf.svg?react';
import { useNavigate } from 'react-router-dom';

function BusinessProfile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    setLoading(true);

    try {
      const response = await getUser();
      console.log('response', response);

      setData(response);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = fileUrl => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-10  p-10 h-full">
        <div className="pt-14 border border-border p-10 flex justify-between rounded-3xl font-medium bg-white w-full min-h-[10%]">
          {loading ? (
            <div className="flex justify-center w-full"> Loading</div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full">
                <h1 className="text-3xl text-black mb-7">Business Profile</h1>
                <Button
                  variant="outline"
                  type="button"
                  className="w-[140px] flex items-center gap-1 max-sm:mb-5"
                  onClick={() => navigate('/update-profile')}
                >
                  {/* <Plus size={20} strokeWidth={1.4} /> */}
                  Update Profile
                </Button>
              </div>

              <div className="flex w-full justify-between mt-10">
                <div className="flex flex-col">
                  <Label className="text-xl">Business Name </Label>
                  <h3 className="text-lg mt-1 font-medium">
                    {data?.businessName || '-'}
                  </h3>
                </div>
                <div className="flex flex-col">
                  <Label className="text-xl">Identification document</Label>
                  <h3 className="text-lg mt-1 font-medium">
                    {data?.files?.identification ? (
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleDownload(data?.files?.identification)
                        }
                      >
                        <DownloadPdf className="mr-2" />
                        Download File
                      </Button>
                    ) : (
                      'no document found'
                    )}
                  </h3>
                </div>
                <div className="flex flex-col">
                  <Label className="text-xl">Business License </Label>
                  <h3 className="text-lg mt-1 font-medium">
                    {' '}
                    {data?.files?.businessLicense ? (
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleDownload(data?.files?.identification)
                        }
                      >
                        <DownloadPdf className="mr-2" />
                        Download File
                      </Button>
                    ) : (
                      'no document found'
                    )}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <Label className="text-xl">IsVerified </Label>
                <h3 className="text-lg mt-1 font-medium">
                  {data?.isVerified ? 'true' : 'false'}
                </h3>
              </div>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default BusinessProfile;
