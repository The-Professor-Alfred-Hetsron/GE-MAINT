"use client"

import { ComponentType, useState, useCallback, memo } from "react";

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/FormControl';


import { AppointmentModel, ViewState, EditingState, IntegratedEditing, ChangeSet } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    Toolbar,
    ViewSwitcher,
    DateNavigator,
    MonthView,
    DayView,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import { 
    maintenanceList
} from '@/data/maintenancePage'

import editRightType from '@/types/editRight'

export default function Maintenance () {

    const actualDate = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
    
    const [ data, setData ] = useState(maintenanceList)
    const [ currentViewName, setCurrentViewName ] = useState('work-week')
    const [ currentDate, setCurrentDate ] = useState('2018-06-27')

    const PREFIX = 'Demo';

    const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    firstRoom: `${PREFIX}-firstRoom`,
    secondRoom: `${PREFIX}-secondRoom`,
    thirdRoom: `${PREFIX}-thirdRoom`,
    header: `${PREFIX}-header`,
    commandButton: `${PREFIX}-commandButton`,
    container: `${PREFIX}-container`,
    text: `${PREFIX}-text`,
    formControlLabel: `${PREFIX}-formControlLabel`,
    };

    const StyledDiv = styled('div')(({ theme }) => ({
        [`&.${classes.container}`]: {
          margin: theme.spacing(2),
          padding: theme.spacing(2),
        },
        [`& .${classes.text}`]: theme.typography.h6,
        [`& .${classes.formControlLabel}`]: {
          ...theme.typography.caption,
          fontSize: '1rem',
        },
      }));

      const editingOptionsList = [
        { id: 'allowAdding', text: 'Adding' },
        { id: 'allowDeleting', text: 'Deleting' },
        { id: 'allowUpdating', text: 'Updating' },
        { id: 'allowResizing', text: 'Resizing' },
      ];

      const EditingOptionsSelector = ({
        options, onOptionsChange,
      }) => (
        <StyledDiv className={classes.container}>
          <Typography className={classes.text}>
            Enabled Options
          </Typography>
          <FormGroup row>
            {editingOptionsList.map(({ id, text }) => {
                    ;
                return (
                    <FormControlLabel
                control={(
                  <Checkbox
                    checked={options[id]}
                    onChange={onOptionsChange}
                    value={id}
                    color="primary"
                  />
                )}
                classes={{ label: classes.formControlLabel }}
                label={text}
                key={id}
                disabled={(id === 'allowResizing') && !options.allowUpdating}
              />
                )
            })}
          </FormGroup>
        </StyledDiv>
      )

    const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
    [`&.${classes.firstRoom}`]: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
    },
    [`&.${classes.secondRoom}`]: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
    },
    [`&.${classes.thirdRoom}`]: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
    },
    [`&.${classes.header}`]: {
        height: '260px',
        backgroundSize: 'cover',
    },
    }));

    const StyledIconButton = styled(IconButton)(() => ({
    [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
    }));

    const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
        textAlign: 'center',
    },
    }));

    const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
    [`&.${classes.icon}`]: {
        color: palette.action.active,
    },
    }));

    const StyledAppointmentTooltipCommandButton = styled(AppointmentTooltip.CommandButton)(() => ({
    [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
    }));

    const getClassByLocation = (location) => {
    if (location === 'Room 1') return classes.firstRoom;
    if (location === 'Room 2') return classes.secondRoom;
    return classes.thirdRoom;
    };

    const Header = (({
        children, appointmentData, ...restProps
      }) => (
        <StyledAppointmentTooltipHeader
          {...restProps}
          className={classNames(getClassByLocation(appointmentData?.location), classes.header)}
          appointmentData={appointmentData}
        >
          <StyledIconButton
            /* eslint-disable-next-line no-alert */
            onClick={() => alert(JSON.stringify(appointmentData))}
            className={classes.commandButton}
            size="large"
          >
            <MoreIcon />
          </StyledIconButton>
        </StyledAppointmentTooltipHeader>
      ));

      const Content = (({
        children, appointmentData, ...restProps
      }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
          <Grid container alignItems="center">
            <StyledGrid item xs={2} className={classes.textCenter}>
              <StyledRoom className={classes.icon} />
            </StyledGrid>
            <Grid item xs={10}>
              <span>{appointmentData?.location}</span>
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
      ));

      const CommandButton = (({
        ...restProps
      }) => (
        <StyledAppointmentTooltipCommandButton {...restProps} className={classes.commandButton} />
      ));

      const [editingOptions, setEditingOptions] = useState({
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true,
        allowResizing: true,
      });
      const [addedAppointment, setAddedAppointment] = useState({});
      const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState(false);
    
      const {
        allowAdding, allowDeleting, allowUpdating, allowResizing,
      } = editingOptions;
    
      const onCommitChanges = useCallback(({ added, changed, deleted }) => {
        if (added) {
          const startingAddedId = data.length > 0 ? Number(data[data.length - 1]?.id) + 1 : 0;
          const tempData = {
              id: startingAddedId, ...added,
              startDate: ""
          }
          setData([...data, tempData]);
        }
        if (changed) {
            setData(data.map((appointment, index) => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        }

        if (deleted !== undefined) {
          setData(data.filter(appointment => appointment?.id !== deleted));
        }
        setIsAppointmentBeingCreated(false);
      }, [setData, setIsAppointmentBeingCreated, data]);

      const onAddedAppointmentChange = useCallback((appointment) => {
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
      },[setAddedAppointment, setIsAppointmentBeingCreated]);
      
      const handleEditingOptionsChange = useCallback(({ target }) => {
        const { value } = target;
        const { [value]: checked } = editingOptions;
        setEditingOptions({
          ...editingOptions,
          [value]: !checked,
        });
      },[editingOptions, setEditingOptions]);
  
    
      const FormCommandButton = useCallback(({ id, ...restProps }) => {
        if (id === 'deleteButton') {
          return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
        }
        return <AppointmentForm.CommandButton id={id} {...restProps} />;
      }, [allowDeleting]);
    
      const allowDrag = useCallback(
        () => allowUpdating,
        [allowUpdating],
      );
      const allowResize = useCallback(
        () => allowResizing && allowUpdating,
        [allowResizing, allowUpdating],
      );

    return(
        <div className="w-full h-full sticky bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <EditingOptionsSelector
                options={editingOptions}
                onOptionsChange={handleEditingOptionsChange}
            />
            <Paper className="h-full">
                <Scheduler
                    data={data}
                    height={660}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={setCurrentDate}
                        currentViewName={currentViewName}
                        onCurrentViewNameChange={setCurrentViewName}
                    />

                    <EditingState
                        onCommitChanges={onCommitChanges}
                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={onAddedAppointmentChange}
                    />

                    <IntegratedEditing />

                    <WeekView
                        name="work-week"
                        displayName="Jour de Travail"
                        excludedDays={[0, 6]}
                        startDayHour={7}
                        endDayHour={16}
                    />
                    <MonthView />
                    <DayView />

                    <Toolbar />
                    <ViewSwitcher />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    <AppointmentTooltip
                        headerComponent={Header}
                        contentComponent={Content}
                        commandButtonComponent={CommandButton}
                        showCloseButton={true}
                        showDeleteButton={allowDeleting}
                    />
                    <AppointmentForm
                        commandButtonComponent={FormCommandButton}
                        readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                    />
                </Scheduler>
            </Paper>
        </div>
    )
}