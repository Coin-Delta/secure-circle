import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoaderIcon, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser, updateUser } from "@/services/user";
import { UpdateProfileSchema } from "@/lib/validators/updateProfile";
import ImageUploader from "@/components/cards/imageuploader/ImageUploader";

const EditBusinessProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [businessName, setBusinessName] = useState();
  const form = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      files: {
        identification: "",
        businessLicense: "",
      },
      walletAddress: "",
      businessLogo: "",
    },
  });

  const getUserDetails = async () => {
    setLoading(true);
    setLoadingFormData(true);
    try {
      const response = await getUser();
      if (response) {
        setLoadingFormData(false);

        form.reset({
          firstName: response?.firstName || "",
          lastName: response?.lastName || "",
          files: {
            identification: response?.files?.identification || "", // URL for identification
            businessLicense: response?.files?.businessLicense || "", // URL for business license
          },
          businessName: response?.businessName,
          walletAddress: response?.walletAddress,
          businessLogo: response?.businessLogo,
        });
        setBusinessName(response?.businessName);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("firstName", data?.firstName);

      formData.append("lastName", data?.lastName);

      if (businessName !== data?.businessName) {
        formData.append("businessName", data?.businessName);
      }
      formData.append("walletAddress", data?.walletAddress);
      if (typeof data?.businessLogo === "object") {
        formData.append("businessLogo", data?.businessLogo);
      }
      formData.append("files[identification]", data?.files.identification);
      formData.append("files[businessLicense]", data?.files.businessLicense);

      await updateUser(formData);
      toast.success("Profile updated successfully");
      resetForm();
      navigate("/business-profile");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    form.reset();
  };

  const handleSubmitForm = async (formData) => {
    handleUpdate(formData);
  };

  return (
    <div className="bg-white p-[30px] max-sm:p-[20px]  mx-auto rounded-3xl shadow-lg flex flex-col">
      {loadingFormData ? (
        <div className="flex justify-center items-center ">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className="flex flex-col justify-evenly"
          >
            <div className="w-full grid grid-cols-1 gap-3">
              <div className="flex w-full justify-between items-center max-sm:p-2">
                <h3 className="text-2xl font-jost font-semibold">
                  Update Profile
                </h3>
              </div>
              <div className="border-b border-primary" />
              <div className=" md:px-3 max-sm:p-2 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className=" gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firstname</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter business name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="businessLogo"
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full mt-2">
                          <FormLabel>Logo</FormLabel>
                          <ImageUploader field={field} />
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Wallet Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="files[identification]" // Removed index to handle single file
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <FormItem className="flex flex-col">
                        <FormLabel>Identification</FormLabel>
                        <FormLabel
                          className={`border-dashed p-3 w-full ${field.value ? "justify-between flex" : "text-center"} items-center relative rounded-2xl border border-primary cursor-pointer text-primary`}
                        >
                          {field?.value ? (
                            <>
                              {!field.value.name ? (
                                <span className="truncate w-4/5">
                                  {field?.value}
                                </span>
                              ) : (
                                <span className="truncate w-4/5">
                                  {field?.value?.name}
                                </span>
                              )}
                              <PencilLine className="ms-auto" />
                            </>
                          ) : (
                            "Choose File"
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="hidden"
                            onChange={(e) => field.onChange(e.target.files[0])} // Use the first file directly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="files[businessLicense]" // Removed index to handle single file
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <FormItem className="flex flex-col">
                        <FormLabel>Business License</FormLabel>
                        <FormLabel
                          className={`border-dashed p-3 w-full ${field.value ? "justify-between flex" : "text-center"} items-center relative rounded-2xl border border-primary cursor-pointer text-primary`}
                        >
                          {field?.value ? (
                            <>
                              {!field.value.name ? (
                                <span className="truncate w-4/5">
                                  {field?.value}
                                </span>
                              ) : (
                                <span className="truncate w-4/5">
                                  {field?.value?.name}
                                </span>
                              )}
                              <PencilLine className="ms-auto" />
                            </>
                          ) : (
                            "Choose File"
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="hidden"
                            onChange={(e) => field.onChange(e.target.files[0])} // Use the first file directly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />

                <div className="flex gap-5 justify-center mt-3">
                  <Button className="w-24" type="submit" loading={loading}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

EditBusinessProfile.propTypes = {};

export default EditBusinessProfile;
