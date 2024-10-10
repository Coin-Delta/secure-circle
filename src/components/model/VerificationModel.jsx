import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getUserById, verifyUser } from '@/services/user';
import { LoaderIcon, Download } from 'lucide-react';

const VerificationModel = ({ isOpenModal, setIsOpenModal, ID, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isVerified, setVerified] = useState(false);
  const handleClose = () => {
    setIsOpenModal(false);
  };

  const fetchUserDetails = async () => {
    setLoadingFormData(true);
    try {
      const res = await getUserById(ID);
      if (res) {
        setUserData(res);
        setVerified(res.isVerified);
      }
    } catch (error) {
      toast.error('Failed to fetch user details');
    } finally {
      setLoadingFormData(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const data = { isVerified: 'true' };
    try {
      await verifyUser(ID, data);
      toast.success('User verified successfully');
      onSuccess();
      handleClose();
    } catch (err) {
      toast.error('Failed to verify user');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (isOpenModal) {
      fetchUserDetails();
    }
  }, [isOpenModal]);

  return (
    <div
      className={`${
        isOpenModal ? 'block' : 'hidden'
      } fixed inset-0 z-50 flex justify-center items-center`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="bg-white w-11/12 p-[30px] md:max-w-2xl mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto flex flex-col">
        {loadingFormData ? (
          <div className="flex justify-center items-center h-96">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col justify-evenly">
            <div className="w-full grid grid-cols-1 gap-5">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-2xl font-jost font-semibold">
                  Business Profile Verification
                </h3>
              </div>
              <div className="border-b border-primary" />

              <div>
                <h4 className="font-semibold">Business Name</h4>
                <p>{userData?.businessName || 'N/A'}</p>
              </div>

              <div>
                <h4 className="font-semibold">Identification Document</h4>
                {userData?.files?.identification ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleDownload(
                        userData.files.identification,
                        'identification.pdf',
                      )
                    }
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Identification
                  </Button>
                ) : (
                  <p>No document available</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold">Business License</h4>
                {userData?.files?.businessLicense ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleDownload(
                        userData.files.businessLicense,
                        'business_license.pdf',
                      )
                    }
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Business License
                  </Button>
                ) : (
                  <p>No document available</p>
                )}
              </div>

              <div className="flex gap-5 justify-center mt-10">
                <Button
                  variant="outline"
                  className="w-24"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="w-24"
                  onClick={handleVerify}
                  disabled={loading || isVerified}
                >
                  {loading ? <LoaderIcon className="animate-spin" /> : 'Verify'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

VerificationModel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  ID: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default VerificationModel;
