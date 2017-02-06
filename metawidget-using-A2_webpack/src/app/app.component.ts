import { Component } from '@angular/core';
import '../../public/css/styles.css';

declare var metawidget: any;

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	model = {
		firstName: "Krishan",
		lastName: "Deo",
		age: 27,
		"address": {
			city: "Bangalore",
			country: "India",
			"address2": {
				city: "Bangalore",
				country: "India",
				"address3": {
					city: "Bangalore",
					country: "India",
					"address4": {
						city: "Bangalore",
						country: "India",
						"address5": {
							city: "Bangalore",
							country: "India",
							"address6": {
								city: "Bangalore",
								country: "India",
								"address7": {
									city: "Bangalore",
									country: "India",
									"address8": {
										city: "Bangalore",
										country: "India",
										"address9": {
											city: "Bangalore",
											country: "India",
											"address10": {
												city: "Bangalore",
												country: "India"
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		email: 'krishan.deo@bizruntime.com'
	};

	schemaConfiguration: Object = {
		"type": "object",
		"properties": {
			"firstName": {
				"type": "string"
			},
			"lastName": {
				"type": "string"
			},
			"age": {
				"type": "integer"
			},
			"address": {
				"type": "object",
				"properties": {
					"city": {
						"type": "string"
					},
					"country": {
						"type": "string"
					},
					"address2": {
						"type": "object",
						"properties": {
							"city": {
								"type": "string"
							},
							"country": {
								"type": "string"
							},
							"address3": {
								"type": "object",
								"properties": {
									"city": {
										"type": "string"
									},
									"country": {
										"type": "string"
									},
									"address4": {
										"type": "object",
										"properties": {
											"city": {
												"type": "string"
											},
											"country": {
												"type": "string"
											},
											"address5": {
												"type": "object",
												"properties": {
													"city": {
														"type": "string"
													},
													"country": {
														"type": "string"
													},
													"address6": {
														"type": "object",
														"properties": {
															"city": {
																"type": "string"
															},
															"country": {
																"type": "string"
															},
															"address7": {
																"type": "object",
																"properties": {
																	"city": {
																		"type": "string"
																	},
																	"country": {
																		"type": "string"
																	},
																	"address8": {
																		"type": "object",
																		"properties": {
																			"city": {
																				"type": "string"
																			},
																			"country": {
																				"type": "string"
																			},
																			"address9": {
																				"type": "object",
																				"properties": {
																					"city": {
																						"type": "string"
																					},
																					"country": {
																						"type": "string"
																					},
																					"address10": {
																						"type": "object",
																						"properties": {
																							"city": {
																								"type": "string"
																							},
																							"country": {
																								"type": "string"
																							},
																							"button": {
																								"type": "function"
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			"email": {
				"type": "string"
			},
			"address3": {
				"type": "object",
				"properties": {
					"city": {
						"type": "string"
					},
					"country": {
						"type": "string"
					}
				}
			}
		}
	};

	config: Object = {
		inspector: new metawidget.inspector.JsonSchemaInspector(this.schemaConfiguration)
	};

}