import React from "react";
import AccountResetPanel from "../../components/AccountResetPanel/AccountResetPanel";
import { AccountResetPageWrapper } from "./AccountReset.styled";

function AccountReset() {
	return (
		<AccountResetPageWrapper>
			<div className="reset-page-center">
				<AccountResetPanel />
			</div>
		</AccountResetPageWrapper>
	);
}

export default AccountReset;
