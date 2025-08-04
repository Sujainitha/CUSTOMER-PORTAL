process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
const X2JS = require("x2js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Customer Login Route
app.post("/custlogin", (req, res) => {
    const { username, password } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_LOGIN_VALIDATION>
         <CUST_ID>${username}</CUST_ID>
         <PASSWORD>${password}</PASSWORD>
      </urn:ZFM_CUST_LOGIN_VALIDATION>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zws_cust_portal_loginvalid?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});

// Customer profile route
app.post("/custprofile", (req, res) => {
    const { username } = {...req.body};
    console.log("Received username:", username);
    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_PROFILE_SG>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_PROFILE_SG>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_profile_sg?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }
        console.log("Response body:", body);
        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        console.log("Response from SAP:", jsonResponse);
        res.send(jsonResponse);
    });
});

// Customer inquiry 
app.post("/custinquiry", (req, res) => {
    const { username } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_DASHBOARD_INQUIRYDATA>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_DASHBOARD_INQUIRYDATA>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_dash_inquiry?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});

// Customer sales order
app.post("/custsalesorder", (req, res) => {
    const { username } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_DASHBOARD_SALESORDER>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_DASHBOARD_SALESORDER>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_dash_salesord?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});

// Customer derivery
app.post("/custdelivery", (req, res) => {
    const { username } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_DASHBOARD_DELIVERY>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_DASHBOARD_DELIVERY>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_dash_delivery?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});

// Customer invoice
app.post("/custinvoice", (req, res) => {
    const { username } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_FINANCESHEET_INVOICE>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_FINANCESHEET_INVOICE>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_finance_invoic?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});


// Customer invoice pdf
app.post("/customerinvoicepdf", (req, res) => {
    const { username ,invoice } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_FINANCESHEET_PDF_INVO>

         <IV_DOC>${username}</IV_DOC>
      </urn:ZFM_CUST_FINANCESHEET_PDF_INVO>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_invoice_pdf?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});

// Customer Paying & Ageing
app.post("/customerpayage", (req, res) => {
    const { username} = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_FINANCESHEET_PAYAGE>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_FINANCESHEET_PAYAGE>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_finance_payage?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});

// CREDIT & DEBIT MEMO
app.post("/custcd", (req, res) => {
    const { username } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_FINANCESHEET_MEMO>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_FINANCESHEET_MEMO>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_finance_memo?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});

// OVERALL SALES 
app.post("/custoverallsales", (req, res) => {
    const { username } = req.body;

    const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_FINANCESHEET_OVERSALE>
         <CUST_ID>${username}</CUST_ID>
      </urn:ZFM_CUST_FINANCESHEET_OVERSALE>
   </soapenv:Body>
</soapenv:Envelope>
`;

    const options = {
        method: 'POST',
        url: 'https://AZKTLDS5CP.kcloud.com:44300/sap/bc/srt/scs/sap/zws_cust_portal_finance_oversa?sap-client=100',
        headers: {
            'Content-Type': 'text/xml/soap+xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);
        res.send(jsonResponse);
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Customer Login Server running on http://localhost:${PORT}`);
});
