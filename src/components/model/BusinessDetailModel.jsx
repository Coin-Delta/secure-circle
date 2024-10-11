import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getUserById } from "@/services/user";
import { LoaderIcon, ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const BusinessDetailsModal = ({ isOpen, onClose, businessId }) => {
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState(null);

  const fetchBusinessDetails = async () => {
    setLoading(true);
    try {
      const res = await getUserById(businessId);
      if (res) {
        setBusinessData(res);
      }
    } catch (error) {
      toast.error("Failed to fetch business details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && businessId) {
      fetchBusinessDetails();
    }
  }, [isOpen, businessId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="bg-white w-11/12 p-[30px] md:max-w-3xl mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 grid grid-cols-1 gap-5">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-2xl font-jost font-semibold">
                  Business Details
                </h3>
              </div>
              <div className="border-b border-primary" />

              <div>
                <h4 className="font-semibold">Business Name</h4>
                <p>{businessData?.businessName || "N/A"}</p>
              </div>

              <div>
                <h4 className="font-semibold">Owner</h4>
                <p>
                  {`${businessData?.firstName || ""} ${
                    businessData?.lastName || ""
                  }`.trim() || "N/A"}
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Email</h4>
                <p>{businessData?.email || "N/A"}</p>
              </div>

              <div>
                <h4 className="font-semibold">Wallet Address</h4>
                <p className="break-all">
                  {businessData?.walletAddress || "N/A"}
                </p>
              </div>

              {businessData?.website && (
                <div>
                  <h4 className="font-semibold">Website</h4>
                  <a
                    href={businessData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-2"
                  >
                    {businessData.website}
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}

              <div className="flex justify-center mt-10">
                <Button
                  variant="outline"
                  className="w-24"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0">
              {businessData?.businessLogo && (
                <div className="mb-4">
                  <img
                    src={businessData.businessLogo}
                    alt="Business Logo"
                    className="w-32 h-32 object-contain"
                  />
                </div>
              )}
              <h4 className="font-semibold mb-4">Wallet QR Code</h4>
              {businessData?.walletAddress ? (
                <QRCodeSVG value={businessData.walletAddress} size={200} />
              ) : (
                <p>No wallet address available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

BusinessDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  businessId: PropTypes.string,
};

export default BusinessDetailsModal;
