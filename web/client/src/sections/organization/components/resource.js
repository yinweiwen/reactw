import React, { useEffect } from 'react';
import { Checkbox, Table } from 'antd';
import { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

const Resource = props => {
    const { roleData, userRole, userSelected, setResCode } = props;
    const [indeterminate, setIndeterminate] = useState({});
    const [roleCheck, setRoleCheck] = useState({});//一级权限码
    const [parentRoleCheck, setParentRoleCheck] = useState({}); //二级权限码

    useEffect(() => {
        const check = {}
        const parentCheck = {}
        const initInd = {}
        roleData && roleData.map && roleData.map(r => {
            let currentInd = false;
            let sum = 0;
            if (r.resources) {
                check[r.code] = []
                r.resources.map(child => {
                    if (userRole.find(code => code.resourceId == child.code)) {
                        currentInd = true;
                        sum++;
                        check[r.code].push(child.code);
                    }
                })
            }
            parentCheck[r.code] = r.resources.length === sum
            initInd[r.code] = parentCheck[r.code] ? false : currentInd
        });
        setParentRoleCheck(parentCheck)
        setRoleCheck(check);
        setIndeterminate(initInd);
    }, [userRole]);

    const setResData = (role) => {
        let codes = [];
        // Object.keys(partRole).map(r => {
        //     if (partRole[r]) codes.push(r)
        // })
        Object.keys(role).map(r => {
            if (role[r].length) {
                codes.push(r);
            }
            codes = codes.concat(role[r])
        })
        setResCode(codes)
    }
    return (
        <Table
            bordered
            pagination={false}
            dataSource={roleData}
            columns={[{
                title: '功能',
                key: 'name',
                dataIndex: 'name',
                render: (text, record) => {
                    const parentCode = record.code
                    return <Checkbox
                        indeterminate={indeterminate[parentCode]}
                        onChange={(e) => {
                            const currentParCheck = JSON.parse(JSON.stringify(parentRoleCheck));
                            currentParCheck[parentCode] = e.target.checked;
                            const currentCode = JSON.parse(JSON.stringify(roleCheck));
                            currentCode[parentCode] = e.target.checked ? roleData.find(r => r.code == parentCode).resources.map(r => r.code) : []
                            const currentInd = JSON.parse(JSON.stringify(indeterminate));
                            currentInd[parentCode] = false;

                            setParentRoleCheck(currentParCheck);
                            setRoleCheck(currentCode);
                            setIndeterminate(currentInd);
                            setResData(currentCode)
                        }}
                        checked={parentRoleCheck[parentCode] || false}
                        disabled={userSelected === "SuperAdmin"}
                    >
                        {text}
                    </Checkbox>
                }
            }, {
                title: '列表',
                key: 'resources',
                dataIndex: 'resources',
                render: (text, record) => {
                    let data = [];
                    console.log()
                    text.map(s => { s.name!=="整治汇总编辑"? data.push({ label: s.name, value: s.code }):''})
                    let parentCode = record.code;
                    
                    return <CheckboxGroup
                        disabled={userSelected === "SuperAdmin"}
                        options={data}
                        value={roleCheck[parentCode] || []}
                        onChange={value => {
                            const checkArr = JSON.parse(JSON.stringify(roleCheck));
                            const parentCheck = JSON.parse(JSON.stringify(parentRoleCheck));
                            const ind = JSON.parse(JSON.stringify(indeterminate));
                            const currentCode = roleData.find(r => r.code == parentCode) || {}

                            checkArr[parentCode] = value;
                            ind[parentCode] = !!value.length && value.length < currentCode.resources.length
                            parentCheck[parentCode] = value.length === currentCode.resources.length

                            setRoleCheck(checkArr);
                            setIndeterminate(ind);
                            setParentRoleCheck(parentCheck);
                            setResData(checkArr)
                        }}
                    />
                }
            }]}
        ></Table >
    )
}
export default Resource