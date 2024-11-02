
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";


const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return;
        if(search.length < 3) {
            return toast.error('A pesquisa precisa de no mínimo 3 caracteres');
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

        if(conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else toast.error("Usuário não encontrado");
    }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='Pesquisar' className='input input-bordered rounded-full' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <FaSearch />
        </button>
    </form>
  )
}

export default SearchInput