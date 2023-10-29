// en.js
export default {
    config: {
        title: 'BMS MGT',
        name: 'Admin Console',
        requestFail: 'request failure',
        401: 'Identity authentication failed',
        langEn: 'en',
        langZh: 'zh'
    },
    home: {
        title1: 'Device Soc',
        title2: 'Fault level',
        title3: 'charging-discharging',
        title4: 'Map statistics',
        title5: 'Fault Info',
        title6: 'Devices List',
        onlineShow: 'ShowOnline',
        cd: 'Charging',
        fd: 'Discharge',
        editInfo: 'Edit Info',
        runTime: 'Run time',
        time: 'Duration',
        tower: 'Tower',
        projectNum: 'Number of projects',
        deviceNum: 'Number of devices',
        onlineNum: 'Online quantity',
        faults: 'Number of faults',
        lastWeek: 'Last Week',
        lastMonth: 'Last Month',
        lastyear: 'Last Year',
    },
    login: {
        login: 'Login',
        userName: 'Please enter a username',
        password: 'Please enter the password',
        code: 'Fill in the verification code on the right',
        msg: 'Login succeeded',
        emptyUser: 'User name cannot be empty',
        emptyPwd: 'Password cannot be empty',
        emptyCode: 'The verification code cannot be empty',
    },

    table: {
        index: 'Serial Number',
        project_name: 'Project Number',
        identify_code: 'Device ID',
        desc: 'Describe',
        version: 'Version',
        dataupdate_datetime: 'Start Time',
        EndTime: 'End Time',
        status: 'Status',
        name:'Name',
        filter: 'Filter',
        print: 'Point',
        export: 'Export',
        deviceNum: 'Device Number',
        onlineNum: 'Online quantity',
        userProjectNumber: 'User project number',
        searchText: 'Enter keyword search',
        delSubUser: 'Delete SubUsers',
        addDevice: 'Add Device',
        changePassword: 'Change Password',
        subUserName: 'Sub Users Name',
        company: 'Company',
        operate: 'Operate',
        addUserSub: 'Please fill in the sub username',
        enterPwd: 'Please enter the password again',
        unbind: 'Unbind',
        areYueUnbind: 'Are you sure to unbind?',
        unBindSuc: 'Unbind successfully',
        pName: 'Project Name',
        upSuccess: 'Upgrade Successful',
        kx: 'Optional Equipment',
        bindSuccess: 'Binding successful!',
        password: 'Password',
        confirmPwd: 'Confirm Password',
        delChild: 'Delete Child',
        confirmDel: 'Are you sure to delete the sub user?',
        confirmUnbind: 'Are you sure to unbind?',
        success: 'Operation successful',
        fail: 'operation failed',
        enterCompany: 'Fill in the company name',
        uploadFile:'Upload File',
        noSelect:'No device selected',
        selected:'Selected device',
        startSoc:'Start SOC',
        endSoc:'End SOC',
        time:'Duration',
        fileName:'File Name',
        updateState:'Upload State',
        creator:'Creator',
        creationDate:'Creation Date',
        operationsHistory:'Operations History',
        FirmwareUpgrade:'Firmware Upgrade',
        UpgradableFirmware:'Upgradable Firmware',
    },
    device: {
        systemState:'System State',
        nav1:'Basic',
        nav2:'Charge',
        nav3:'Statistics',
        nav4:'Whole',
        nav5:'Serial Number',
        nav6:'Individual voltage',
        nav7:'Monomer Tem',
        nav8:'Curve',
        nav9:'Table',
        historicalChart:'Historical Chart',
        ceilingVoltage:'CeilVolt',
        minimumVoltage:'MiniVolt',
        totalVoltage:'totalVolt',
        totalCurrent:'totalCurr',
        maximumTemp:'maximumTemp',
        minimumTemp:'minimumTemp',
        runState:'Run State',
        download:'Download',
        qrCode:'QrCode',
        time:'Time',
        search:'Search',
        cd:'charge',
        fd:'discharge',
        nocnof:'noCharge noDischarge',
        show1:'Highest monomer',
        show2:'Highest monomer position',
        show3:'Lowest monomer',
        show4:'Lowest monomer position',
        show5:'Average monomer',
        show6:'Differential pressure monomer',
        show7:'maximumTemp',
        show8:'maximumTemp position',
        show9:'minimumTemp',
        show10:'minimumTemp position',
        show11:'average temperature',
        show12:'Differential-PressureTemp',
    },
    btn: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        del: 'Delete',
        update: 'Upgrade device'

    },
    project: {
        projectList: 'Project List',
        projectEqu:"Project equipment",
    },
    subUser: {
        subUserNum: 'Number of sub users',
        userList: 'User List',
        addSubUser: 'Add SubUsers',
        subUserBindDevice: 'Bind device',
        deviceList: 'Device List'
    },
    firmware: {
        title: 'Firmware List',
        upload: 'Upload firmware',
        update: 'Upgrade Firmware',
        del: 'Delete',
        areYue: 'Are you sure to delete the firmware?'
    },
    message: {
        delSuccess: 'Successfully deleted',
    },
    runStatus: {
        base1: 'Number of cycles',
        base2: 'Cumulative running time(h)',
        base3: 'Accumulated charge time(h)',
        base4: 'Accumulated discharge time(h)',
        base5: 'Charge-discharge state',
        base6: 'Heating state',
        base7: 'System state',
        base8: 'Self-inspection code',
        base9: 'High voltage detection 1(V)',
        base10: 'High voltage detection 2(V)',
        base11: 'High voltage detection 3(V)',
        base12: 'High voltage detection 4(V)',
        base13: 'RL1',
        base14: 'RL2',
        base15: 'RL3',
        base16: 'RL4',
        base17: 'RL5',
        base18: 'RL6',
        base19: 'RL7',
        base20: 'RL8',
        cd1: 'A+(V)',
        cd2: 'Charger communication status',
        cd3: 'Charge-discharge state',
        cd4: 'Heating state',
        cd5: 'Requested charging voltage(V)',
        cd6: 'Request charging current(A)',
        cd7: 'Charger output voltage(V)',
        cd8: 'Charger output current(A)',
        cd9: 'Accumulated discharge time(h)',
        cd10: 'This charging time(h)',
        cd11: 'This charging capacity(Ah)',
        cd12: 'This charging energy(kWh)',
        total1: 'Number of cycles',
        total2: 'Cumulative running time(h)',
        total3: 'Accumulated charge time(h)',
        total4: 'Accumulated discharge time(h)',
        total5: 'This charging capacity(Ah)',
        total6: 'This discharging capacity(Ah)',
        total7: 'This charging energy(kWh)',
        total8: 'This discharging energy(kWh)',
        total9: 'Total charging capacity(Ah)',
        total10: 'Total discharging capacity(Ah)',
        total11: 'Total charging energy(kWh)',
        total12: 'Total discharging energy(kWh)',
        total13: 'This charging time(h)',
        total14: 'This discharging time(h)',
        total15: 'This running time(h)',
        total16: 'SOH(%)',
        all1: 'RL1',
        all2: 'RL2',
        all3: 'RL3',
        all4: 'RL4',
        all5: 'RL5',
        all6: 'RL6',
        all7: 'RL7',
        all8: 'RL8',
        all9: 'Number of cycles',
        all10: 'Cumulative running time(h)',
        all11: 'Accumulated charge time(h)',
        all12: 'Accumulated discharge time(h)',
        all13: 'Charge-discharge state',
        all14: 'Heating state',
        all15: 'System state',
        all16: 'Self-inspection code',
        all17: 'A+(V)',
        all18: 'Charger communication status',
        all19: 'Requested charging voltage(V)',
        all20: 'Request charging current(A)',
        all21: 'Charger output voltage(V)',
        all22: 'Charger output current(A)',
        all23: 'Sleep timing time(min)',
        all24: 'Sleep time remaining(min)',
        all25: 'High voltage detection 1(V)',
        all26: 'High voltage detection 2(V)',
        all27: 'High voltage detection 3(V)',
        all28: 'High voltage detection 4(V)',
        all29: 'Normal voltage(V)',
        all30: 'KeyOn(V)',
        all31: 'Adhesive code',
        all32: 'CC2 Resistance(Ω)',
        all33: 'CC Resistance(Ω)',
        all34: 'CP Duty cycle(%)',
        all35: 'GB status1',
        all36: 'GB status2',
        all37: 'This charging capacity(Ah)',
        all38: 'This discharging capacity(Ah)',
        all39: 'This charging energy(kWh)',
        all40: 'This discharging energy(kWh)',
        all41: 'Total charging capacity(Ah)',
        all42: 'Total discharging capacity(Ah)',
        all43: 'Total charging energy(kWh)',
        all44: 'Total discharging energy(kWh)',
        all45: 'This charging time(h)',
        all46: 'This discharging time(h)',
        all47: 'This running time(h)',
        all48: 'SOH(%)',
        all49: 'Insulation degree(Ω/V)',
        all50: 'Insulation resistance Rp(kΩ)',
        all51: 'Insulation resistance Rn(kΩ)',
        all52: 'Retain',
        all53: 'NTC1(℃)',
        all54: 'NTC2(℃)',
        all55: 'Retain',
        all56: 'Retain',
    }
}