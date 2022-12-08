/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ActionMember from "../../components/action/ActionMember";
import LabelStatus from "../../components/label/LabelStatus";
import Account from "../../components/user/Account";
import { getCurrentUser, PENDING } from "../../utils/constants";
import { getUserById } from "../../redux/apiRequest";

function MemberGroupItem({ data, setGroupList = () => {} }) {
  // const [dataMember, setDataMember] = useState(data);
  const id = data?.user_id;
  const [member, setMember] = useState({});
  const user = getCurrentUser();
  useEffect(() => {
    getUserById(id, user?.access_token).then(res => setMember(res));
  }, []);

  const isCurrent = id === user?.user?.user_id;
  return (
    <tr>
      <td>
        <Account
          username={member?.user?.name}
          avatar_url={member?.user?.avatar_url}
          isCurrent={isCurrent}
          type={data.role}
        />
      </td>
      <td>
        <LabelStatus type="success">{data.status}</LabelStatus>
      </td>
      <td>
        <ActionMember
          setData={setGroupList}
          data={data}
          member={member}
          isCurrent={isCurrent}
          isPending={data.status === PENDING}
        />
      </td>
    </tr>
  );
}
MemberGroupItem.propTypes = {
  data: PropTypes.object,
  setGroupList: PropTypes.func.isRequired,
};

export default MemberGroupItem;
