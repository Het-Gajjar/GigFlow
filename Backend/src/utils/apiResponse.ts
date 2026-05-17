export const sendResponse = (
    res: any,
    statusCode: number,
    message: string,
    data: Record<string, unknown> = {}
) => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        ...data,
    });
};
