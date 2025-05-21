import { useState } from 'react';

export function useForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({ name: "", email: "", message: "" });
      setFormStatus("success");
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  };

  return { formData, formStatus, handleSubmit };
}
