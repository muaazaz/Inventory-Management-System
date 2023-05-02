import BarChart from "../../Components/Shared/BarChart/BarChart";
import Cards from "../../Components/Shared/Cards/Cards";
import { Link } from "react-router-dom";
import Tables from "../../Components/Shared/Tables/Tables";
import { complaintLabel } from "../../Constant/tablesData";
import "./superAdminDashboard.css";
import { Box, Typography,  Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { chartDiv, headerText, mainDiv, stats, tableDiv, tabsDiv } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintCount, getComplaints } from "../../Redux/complaint/complaintAction";
import { getOrganizationCount } from "../../Redux/organization/organizationAction";
import { getUserCount } from "../../Redux/user/userAction";

const SuperAdminDashboard = () => {
    const dispatch = useDispatch(),
        [orgTable, setOrgTable] = useState(1),
        { complaintData, orgData, userData } = useSelector((state) => state)

    useEffect(() => {
        dispatch(getComplaints())
        dispatch(getComplaintCount())
        dispatch(getOrganizationCount())
        dispatch(getUserCount())
    }, [dispatch])

    return (
        <Box sx={mainDiv}>
            <Typography sx={headerText}>Dashboard</Typography>
            <Box sx={stats}>
                <Cards
                    title={"Organizations"}
                    amount={orgData?.totalCount ? orgData.totalCount : "0"}
                    info={`${orgData?.currentMonthCount?.count ? orgData?.currentMonthCount.count : "0"} new organizations this month`}
                    color={"success"}
                />
                <Cards
                    title={"Admins"}
                    amount={userData.totalCount ? userData.totalCount : "0"}
                    info={`${userData.currentMonthCount?.count ? userData.currentMonthCount.count : "0"} active admins this month`}
                    color={"success"}
                />
                <Cards
                    title={"Pending Complaints"}
                    amount={complaintData.totalPendingCount ? complaintData.totalPendingCount : "0"}
                    info={`${complaintData.currentMonthPendingCount ? complaintData.currentMonthPendingCount : "0"} pending complaints this month`}
                    color={"error"}
                />
                <Cards
                    title={"Resolved Comlaints"}
                    amount={complaintData.totalResolvedCount ? complaintData.totalResolvedCount : "0"}
                    info={`${complaintData.currentMonthResolvedCount ? complaintData.currentMonthResolvedCount : "0"} resolved Complaints this month`}
                    color={"success"}
                />
            </Box>
            <Box sx={tabsDiv}>
                <Tabs                    
                    value={orgTable}
                    onChange={(e, value) => {
                        setOrgTable(value);
                    }}
                    variant="scrollable"
                >
                    <Tab label="Organizations" value={1} />
                    <Tab label="Admins" value={2} />
                </Tabs>
            </Box>
            <Box sx={chartDiv}>                
                {orgTable === 1  ? 
                <Box sx={{ width: "100%" }}><BarChart data={orgData?.monthlyCount} label={[["Month", "Organizations"]]} /></Box>
                :
                <Box sx={{ width: "100%" }}><BarChart data={userData?.monthlyCount} label={[["Month", "Admins"]]} /></Box>
                }
            </Box>
            <Box sx={tableDiv}>
                <Typography variant="p">Recent Complaints</Typography>
                <Link className="admin-all-link" to="/complaints">See all</Link>
            </Box>
            <Tables
                label={complaintLabel}
                rowsPerPage={4}
                hidden={true}
                viewRoute={"/complaints/details/"}
                data={complaintData.complaints ? complaintData.complaints : []}
            />
        </Box>
    );
};

export default SuperAdminDashboard;
