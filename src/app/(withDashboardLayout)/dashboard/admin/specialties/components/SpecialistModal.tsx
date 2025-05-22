import HCModal from "@/components/Shared/HCModal/HCModal"

type TSpecialisModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SpecialistModal = ({ open, setOpen }: TSpecialisModal) => {
    return (
        <HCModal open={open} setOpen={setOpen} title="Create a New Specialist">
            pfdafa
        </HCModal>
    );
};

export default SpecialistModal;