"use client";
import React, { useEffect, useState } from "react";
import {
  getSettings,
  updateSettings,
} from "../../../app/GlobalRedux/Features/settings/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ImageURLtofile } from "@/utils/ImageURLto file";
import { useToast } from "@chakra-ui/react";
import Loading from "@/app/blogs/loading";
import { BsUpload } from "react-icons/bs";
const SettingsPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userDetails = useSelector((state) => state.user);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const data = await dispatch(getSettings());
    const {
      copyright,
      discord_link,
      github_link,
      facebook_link,
      twitter_link,
      address,
      email,
      phone,
      logo,
    } = data?.payload?.settings;
    if (data?.payload?.settings) {
      setLoading(false);
    }
    setValue("copyright", copyright);
    setValue("discord", discord_link);
    setValue("github", github_link);
    setValue("facebook", facebook_link);
    setValue("twitter", twitter_link);
    setValue("address", address);
    setValue("email", email);
    setValue("phone", phone);
    const fileData = await ImageURLtofile(data.payload.settings?.logo);
    setFile(fileData);
  };

  useEffect(() => {
    fetchSettings();
  }, []);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpdateSettings = async () => {
    const formData = new FormData();
    const values = getValues();
    formData.append("copyright", values.copyright);
    formData.append("discord_link", values.discord);
    formData.append("github_link", values.github);
    formData.append("facebook_link", values.facebook);
    formData.append("twitter_link", values.twitter);
    formData.append("logo", file);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("phone", values.phone);

    try {
      const response = await dispatch(
        updateSettings({ formData, token: userDetails?.token })
      );
      fetchSettings();
      const { error, message, success } = response.payload;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else if (error) {
        toast({
          title: error,
          description: message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div className="h-full mb-10 md:ml-64">
      {loading ? (
        <Loading />
      ) : (
        <div className="my-10 border-b rounded-lg mx-auto w-full px-4 py-8 sm:px-8">
          <div className="setting-title  border-b dark:border-gray-700 bg-blue-950 align-center  p-2 mb-4">
            <h2 className="text-xl text-left  text-white uppercase font-bold mb-0">
              Website Settings
            </h2>
          </div>

          <form onSubmit={handleSubmit(handleUpdateSettings)}>
            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Copyright
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="copyright"
                {...register("copyright")}
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Discord
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="https://discord.com"
                {...register("discord")}
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Github
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="https://github.com"
                {...register("github")}
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Facebook
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="https://facebook.com"
                {...register("facebook")}
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                X
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="https://x.com"
                {...register("twitter")}
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Address
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="121 King Street, Melbourne Victoria 3000 Australia"
                {...register("address")}
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Phone
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="+1 609 751 0502"
                {...register("phone")}
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                placeholder="support@revanatech.com"
                {...register("email")}
              />
            </div>
            <div className="mb-4 flex  items-center">
              <label className="block w-full text-sm font-medium text-gray-600 mb-2">
                Website Logo
              </label>
              <div className="relative w-full">
                {file ? (
                  <>
                    <div className="input--img-box">
                      <img src={URL?.createObjectURL(file)} alt="img" />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${file}`}
                      alt="img"
                    />
                  </>
                )}
                {/* <BsUpload className="upload--icon-img" /> */}
                <input
                  type="file"
                  className="border rounded w-1/2 py-2 px-3 logo--input focus:outline-none focus:border-blue-500"
                  defaultValue={file?.name}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className=" text-center text-white bg-orange-100 hover:bg-red-500 font-bold py-2 px-4 rounded focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
