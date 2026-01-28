const loggingPlugin = {
    async requestDidStart(requestContext) {
        const start = Date.now();
        let opName = requestContext.request.operationName;

        if (!opName) {
            // Try to extract operation name from the query string if it exists
            const query = requestContext.request.query || '';
            const firstLine = query.trim().split('\n')[0].substring(0, 50);
            opName = `Unnamed (${firstLine}...)`;
        }

        console.log(`[Request Started] Operation: ${opName}`);

        return {
            async willSendResponse(requestContext) {
                const duration = Date.now() - start;
                console.log(`[Request Success] Operation: ${opName} (${duration}ms)`);
            },
            async didEncounterErrors(requestContext) {
                console.error(`[Request Error] Operation: ${opName} - Errors:`, JSON.stringify(requestContext.errors, null, 2));
            },
        };
    },
};

module.exports = loggingPlugin;
