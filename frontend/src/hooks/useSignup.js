import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword });
    if(!success) return;
    setLoading(true);
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, username, password, confirmPassword } ),
        })

        const data = await res.json();
        if(data.error) {
            throw new Error(data.error);
        }
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup

function handleInputErrors({ fullName, username, password, confirmPassword }){
    if(!fullName || !username || !password || !confirmPassword) {
        toast.error("Preencha todos os campos");
        return false;
    }
    if(password !== confirmPassword) {
        toast.error("As senhas devem ser iguais");
        return false;
    }
    if(password.length < 6){
        toast.error("A senha deve ter pelo menos 6 caracteres");
        return false;
    }
    return true;
}