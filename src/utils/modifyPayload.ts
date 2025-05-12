// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modifyPayload = (data: any) => {
    const obj = { ...data }
    const convertData = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("data", convertData);

    return formData;
}