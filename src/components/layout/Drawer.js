import React, { Fragment, useEffect, useState } from 'react';
import { Drawer as DRW, Empty, Spin } from 'antd';
import './layout.styles.scss';
import useTask from '../../Hooks/useTask';
import EditTask from '../forms/editTask';

const Drawer = ({ drawer }) => {
	const [showDrawer, setShowDrawer] = useState(true);
	const { task } = useTask();

	useTask();
	useEffect(() => {
		// console.log('Se repinta el componente');

		let timer;
		if (drawer === 'true') {
			timer = setTimeout(() => {
				setShowDrawer(true);
			}, 100);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [drawer]);

	const onClose = () => {
		window.localStorage.setItem('drawer', JSON.stringify(false));
		setShowDrawer(false);
		return true;
	};

	return (
		<Fragment>
			<div className="drawer_container">
				<DRW title="Editar tarea" placement="right" closable={true} onClose={onClose} visible={showDrawer} width={600} height="100%">
					{!task && (
						<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 50 }}>
							<Spin />
							<p style={{ textAlign: 'center', margin: 10 }}>Cargando tarea</p>
						</div>
					)}
					<EditTask onClose={onClose} />
				</DRW>
			</div>
		</Fragment>
	);
};

export default Drawer;
