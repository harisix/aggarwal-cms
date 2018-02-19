import React from "react";
import { Link } from "react-router-dom";
import logo from '../../logo.png'
import "./style.css";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMenuId:'',
			active:false
		};
		this.openMenu = this.openMenu.bind(this);
	}
	openMenu() {
		this.setState({
			active:!this.state.active
		})
	}
	menuToggle(id) {
		this.setState({
			activeMenuId:this.state.activeMenuId === id?'':id
		});
	}
  render() {
    return (
		<div>
			<header className="text-center">
				<i className="glyphicon glyphicon-menu-hamburger menuIcon" onClick={this.openMenu}></i>
				<Link to="/dashboard"><img src='http://www.sathyauidev.com/agarwal/static/media/logo.deef22df.png' alt="" width='40' /></Link>
		<a href="#"><i className="glyphicon glyphicon-user admin"></i></a>
		<a href="#"><i className="glyphicon glyphicon-log-out logout"></i></a>
			</header>
			<div className={["sideNav", this.state.active && 'active'].join(' ')}>
				<span className="menu">Menu</span>
				<i className="glyphicon glyphicon-menu-hamburger closeIcon" onClick={this.openMenu}></i>
				<ul>
					<li><Link to="/dashboard">Dashboard</Link></li>
					<li><a href="javascript:void(0)" onClick={this.menuToggle.bind(this, 2)} className="subLevel">Category management <i className="glyphicon glyphicon-chevron-down"></i></a>
						<ul className={this.state.activeMenuId === 2 && "subOpen"}>
							<li><Link to="/category">Main Category</Link></li>
							<li><Link to="/sub-category">Sub-Category</Link></li>
							<li><Link to="/level-one-sub-category">2 level Sub-Category</Link></li>
							<li><Link to="/level-two-sub-category">3 level Sub-Category</Link></li>
						</ul>
					</li>
					<li><Link to="/product">Product management</Link></li>
					<li><a href="javascript:void(0)" onClick={this.menuToggle.bind(this, 1)} className="subLevel">Banner management <i className="glyphicon glyphicon-chevron-down"></i></a>
						<ul className={this.state.activeMenuId === 1 && "subOpen"}>
							<li><Link to="/homeBanners">Home Banners</Link></li>
							<li><Link to="/medicosBanners">Medicos Banners</Link></li>
							<li><Link to="/opticalsBanners">Opticals Banners</Link></li>
						</ul>
					</li>
					<li><Link to="/orderManagement">Order management</Link></li>
					<li><a href="javascript:void(0)" onClick={this.menuToggle.bind(this, 3)} className="subLevel">Slider management <i className="glyphicon glyphicon-chevron-down"></i></a>
						<ul className={this.state.activeMenuId === 3 && "subOpen"}>
							<li><Link to="/dealsoftheDay">Deals of the Day</Link></li>
							<li><Link to="/dailyNeeds">Daily Needs</Link></li>
						</ul>
					</li>
				    <li><Link to="/salesmanManagement">Salesman Management</Link></li>
					<li><Link to="/regionManagement">Region management</Link></li>
					<li><Link to="/customerManagement">Customer Management</Link></li>
					<li><a href="javascript:void(0)" onClick={this.menuToggle.bind(this, 4)} className="subLevel">Settings<i className="glyphicon glyphicon-chevron-down"></i></a>
						<ul className={this.state.activeMenuId === 4 && "subOpen"}>
							<li><Link to="/settings">Admin Settings</Link></li>
							<li><Link to="/managePushNotification">Manage Push Notification</Link></li>
							<li><Link to="/changePassword">Change Password</Link></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
    );
  }
}

export default Header;
