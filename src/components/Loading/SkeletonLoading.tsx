import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

const SkeletonBox = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
}));

const SkeletonLoading = () => {
    return (
        <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
                <SkeletonBox height={14} />
            </Grid>
            <Grid size={12}>
                <SkeletonBox height={14} />
            </Grid>
            <Grid size={4}>
                <SkeletonBox height={100} />
            </Grid>
            <Grid size={8}>
                <SkeletonBox height={100} />
            </Grid>

            <Grid size={12}>
                <SkeletonBox height={150} />
            </Grid>
            <Grid size={12}>
                <SkeletonBox height={14} />
            </Grid>

            <Grid size={3}>
                <SkeletonBox height={100} />
            </Grid>
            <Grid size={3}>
                <SkeletonBox height={100} />
            </Grid>
            <Grid size={3}>
                <SkeletonBox height={100} />
            </Grid>
            <Grid size={3}>
                <SkeletonBox height={100} />
            </Grid>
            <Grid size={6}>
                <SkeletonBox height={100} />
            </Grid>
            <Grid size={6}>
                <SkeletonBox height={100} />
            </Grid>
            <Grid size={12}>
                <SkeletonBox height={100} />
            </Grid>
        </Grid>
    );
};

export default SkeletonLoading;