import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCModal from "@/components/Shared/HCModal/HCModal";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { zodResolver } from "@hookform/resolvers/zod";
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TReviewModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedAppointmentId: string;
};

const createReviewValidationSchema = z.object({
    comment: z.string().min(1, "Please write a review."),
});

const labels: Record<number, string> = {
    0.5: "0.5 – Very Poor",
    1: "1 – Poor",
    1.5: "1.5 – Below Average",
    2: "2 – Average",
    2.5: "2.5 – Fair",
    3: "3 – Good",
    3.5: "3.5 – Very Good",
    4: "4 – Excellent",
    4.5: "4.5 – Superb",
    5: "5 – Outstanding",
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const CreateReview = ({ open, setOpen, selectedAppointmentId }: TReviewModal) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState<number | null>(0);
    const [hover, setHover] = useState(-1);
    const [createReview] = useCreateReviewMutation();

    const handleCreateReview = async (data: FieldValues) => {
        const reviewData = {
            appointmentId: selectedAppointmentId,
            rating: value,
            comment: data.comment,
        };

        setIsLoading(true);
        try {
            const res = await createReview(reviewData).unwrap();
            if (res?.id) {
                toast.success("Review submitted successfully!", {
                    description: "Thank you for your feedback.",
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });
                setIsLoading(false);
                setOpen(false);
            } else if (res === undefined) {
                toast.error("Review already submitted", {
                    description: "You’ve already reviewed this appointment.",
                    position: "top-center",
                    duration: 6000,
                    icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                    style: { background: '#FDF1F1', border: "1px solid #FECACA" }
                });
                setIsLoading(false);
            }
        } catch (err: any) {
            toast.error("Unable to submit review", {
                description: err?.message || "Please try again later.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });
            setIsLoading(false);
        }
    };

    return (
        <HCModal open={open} setOpen={setOpen} title="Give Your Review">
            <HCForm
                onSubmit={handleCreateReview}
                resolver={zodResolver(createReviewValidationSchema)}
                defaultValues={{ comment: "" }}
            >
                <Box sx={{ px: 1, py: 2 }}>
                    <Grid container spacing={3}>
                        <Grid sx={{ xs: 12 }}>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Rating
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(e, newValue) => setValue(newValue)}
                                    onChangeActive={(e, newHover) => setHover(newHover)}
                                    emptyIcon={<StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
                                    size="large"
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2, minWidth: 100 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {labels[hover !== -1 ? hover : value]}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            {!value && (
                                <Typography variant="caption" color="error" mt={1}>
                                    Please select a rating to enable the comment field.
                                </Typography>
                            )}
                        </Grid>

                        <Grid sx={{ xs: 12 }}>
                            <HCInput
                                name="comment"
                                label="Comment"
                                placeholder="Write your review..."
                                multiline
                                rows={4}
                                fullWidth
                                disabled={!value || value === 0}
                            />
                        </Grid>

                        <Grid sx={{ xs: 12 }}>
                            <Button
                                fullWidth
                                type="submit"
                                startIcon={
                                    isLoading ? (
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <RateReviewIcon />
                                    )
                                }
                                disabled={isLoading}
                                sx={{
                                    py: 1.2,
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    backgroundColor: "#008767",
                                    color: "#fff",
                                    textTransform: "none",
                                    transition: "all 0.4s ease",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: "#008767",
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                            >
                                {isLoading ? 'Submitting...' : 'Submit Review'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </HCForm>
        </HCModal>
    );
};

export default CreateReview;
