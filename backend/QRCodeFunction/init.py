import logging
import azure.functions as func
import qrcode
from io import BytesIO
import base64

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('QR Code Generator function processed a request.')

    # Retrieve 'text' from query parameters or request body
    text = req.params.get('text')
    if not text:
        try:
            req_body = req.get_json()
        except ValueError:
            req_body = None
        
        if req_body:
            text = req_body.get('text')

    # If text is provided, generate the QR code
    if text:
        try:
            # Generate QR code
            img = qrcode.make(text)
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            
            # Encode image to base64
            img_str = base64.b64encode(buffered.getvalue()).decode()

            # Log the success of QR code generation
            logging.info('QR code generated successfully.')

            # Return the base64 encoded image
            return func.HttpResponse(f"data:image/png;base64,{img_str}", mimetype="text/plain")
        except Exception as e:
            # Log any exception that occurs during QR code generation
            logging.error(f"Error generating QR code: {str(e)}")
            return func.HttpResponse(
                "Error generating QR code",
                status_code=500
            )
    else:
        # If 'text' is not provided, return an error message
        logging.warning("No text provided for QR code generation.")
        return func.HttpResponse(
            "Please pass text on the query string or in the request body",
            status_code=400
        )
