import { cn } from "@/utils/utils";
import { TServiceCard } from "./Services.interface";

const ServiceCard = ({ title, description, icon: Icon, className }: TServiceCard) => {
    return (
        <div
            className={cn(
                "bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 w-[280px] md:w-auto",
                className
            )}
        >
            <div className="h-[60px] w-[60px] rounded-xl bg-[#E9F7FD] flex items-center justify-center">
                <Icon className="h-[40px] w-[40px] text-[#40B7EE]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-500 line-clamp-2 leading-snug">
                {description}
            </p>
        </div>
    );
};

export default ServiceCard;