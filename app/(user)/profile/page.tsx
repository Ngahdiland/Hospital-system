"use client";
// Example profile page for patient users
import PatientLayout from '../../../components/patient-layout';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";

interface ProfileForm {
  name: string;
  gender: string;
  dob: string;
  contact_info: string;
  profile_image?: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const [health, setHealth] = useState({ allergies: "None", blood_group: "O+" }); // Demo
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { errors, isDirty } } = useForm<ProfileForm>();

  useEffect(() => {
    fetch("/api/profile").then(r => r.json()).then(data => {
      setProfile(data);
      setValue("name", data.name);
      setValue("gender", data.gender);
      setValue("dob", data.dob);
      setValue("contact_info", data.contact_info);
      setImgPreview(data.profile_image || null);
    });
  }, [setValue]);

  const onSubmit = async (data: ProfileForm) => {
    if (new Date(data.dob) > new Date()) {
      toast.error("DOB cannot be in the future");
      return;
    }
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, profile_image: imgPreview })
    });
    if (res.ok) {
      toast.success("Profile updated");
      const updated = await res.json();
      setProfile(updated);
      // TODO: Sync sidebar/topbar if needed
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <PatientLayout>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full max-w-5xl p-8 bg-white rounded shadow flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative">
                {imgPreview ? (
                  <Image src={imgPreview} alt="Profile" fill className="rounded-full object-cover" />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl">?</div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImage} className="block" />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
              <input {...register("name", { required: true })} className="input input-bordered w-full" />
              {errors.name && <span className="text-red-500 text-xs">Required</span>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Gender</label>
              <select {...register("gender", { required: true })} className="input input-bordered w-full">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-xs">Required</span>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Date of Birth</label>
              <input type="date" {...register("dob", { required: true })} className="input input-bordered w-full" />
              {errors.dob && <span className="text-red-500 text-xs">Required</span>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Contact Info</label>
              <input {...register("contact_info", { required: true })} className="input input-bordered w-full" />
              {errors.contact_info && <span className="text-red-500 text-xs">Required</span>}
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow mt-4 disabled:opacity-60" disabled={!isDirty}>Save Changes</button>
          </form>
          <div className="mt-8">
            <h2 className="font-bold mb-2">Health Records</h2>
            <div className="bg-gray-50 p-4 rounded">
              <div><span className="font-medium">Allergies:</span> {health.allergies}</div>
              <div><span className="font-medium">Blood Group:</span> {health.blood_group}</div>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}