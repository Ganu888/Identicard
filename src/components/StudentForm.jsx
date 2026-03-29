import { useState } from "react";
import "../styles/StudentForm.css";

const StudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    classDiv: "",
    dob: "",
    mobile: "",
    address: "",
    dateOfAdmission: "",
    photo: null,
    photoPreview: null,
    principalSignature: null,
    principalSignaturePreview: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const digitsOnly = String(value ?? "").replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, mobile: digitsOnly });
      setErrors({
        ...errors,
        mobile:
          digitsOnly.length === 0 || digitsOnly.length === 10
            ? null
            : "Mobile number must be exactly 10 digits",
      });
      return;
    }

    setFormData({ ...formData, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "mobile") {
      setErrors((prev) => ({
        ...prev,
        mobile:
          formData.mobile.length === 10 ? null : "Mobile number must be exactly 10 digits",
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: file, photoPreview: reader.result });
      };
      reader.readAsDataURL(file);
      if (errors.photo) setErrors({ ...errors, photo: null });
    }
  };

  const handlePrincipalSignatureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        principalSignature: file,
        principalSignaturePreview: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "DOB is required";
    if (!formData.classDiv.trim()) newErrors.classDiv = "Class & Division is required";
    if (formData.mobile.length !== 10) newErrors.mobile = "Mobile number must be exactly 10 digits";
    if (!formData.photo) newErrors.photo = "Photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      dob: true,
      classDiv: true,
      mobile: true,
      address: true,
      dateOfAdmission: true,
      photo: true,
      principalSignature: true,
    });
    if (!validateForm()) return;

    setIsGenerating(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>Student Information</h2>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? "error" : ""} />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>DOB</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} onBlur={handleBlur} className={errors.dob ? "error" : ""} />
        {errors.dob && <p className="error-message">{errors.dob}</p>}
      </div>

      <div className="form-group">
        <label>Class & Division</label>
        <input type="text" name="classDiv" value={formData.classDiv} onChange={handleChange} onBlur={handleBlur} className={errors.classDiv ? "error" : ""} />

        {errors.classDiv && <p className="error-message">{errors.classDiv}</p>}
      </div>

      <div className="form-group">
        <label>Photo Upload</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} className={errors.photo ? "error" : ""} />
        {errors.photo && <p className="error-message">{errors.photo}</p>}

        {formData.photoPreview && (
          <div className="photo-preview">
            <img src={formData.photoPreview || "/placeholder.svg"} alt="Preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          inputMode="numeric"
          className={errors.mobile ? "error" : ""}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
          }}
        />
        {errors.mobile && <p className="error-message">{errors.mobile}</p>}
      </div>

      <div className="form-group">
        <label>Student Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={3}
          placeholder="Enter address"
        />
      </div>

      <div className="form-group">
        <label>Date of Admission</label>
        <input type="date" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} onBlur={handleBlur} />
      </div>

      <div className="form-group">
        <label>Principal Signature Upload (PNG/JPG)</label>
        <input type="file" accept="image/png, image/jpeg" onChange={handlePrincipalSignatureChange} />
        {formData.principalSignaturePreview && (
          <div className="photo-preview">
            <img src={formData.principalSignaturePreview || "/placeholder.svg"} alt="Principal Signature Preview" />
          </div>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate ID Card"}
      </button>
      <footer>
        <p>©2026 onlineidbuilder. All Rights Reserved by Ganesh Shinde.</p>
      </footer>    </form>
  );
};

export default StudentForm;
