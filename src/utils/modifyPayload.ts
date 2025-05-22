export const modifyPayload = (data: any) => {
    const obj = { ...data }
    const file = obj["file"];
    delete obj["file"];
    const convertData = JSON.stringify(obj);

    const formData = new FormData();
    formData.append("data", convertData);
    formData.append("file", file as Blob);

    return formData;
}