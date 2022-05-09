import React, {PureComponent, createRef} from "react";
import OrgChart from "@balkangraph/orgchart.js";
import "../../index.css";
import {
  DEPARTMENT_LABEL,
  DIRECT_REPORTS_CONTRACTOR_LABEL,
  DIRECT_REPORTS_FULL_TIME_LABEL,
  DIRECT_REPORTS_PARTNER_LABEL,
  DIRECT_REPORTS_TOTAL_LABEL,
  EMAIL_LABEL,
  EMPLOYEE_TYPE_LABEL,
  ID_LABEL,
  IMG_LABEL,
  LOCATION_LABEL,
  NAME_LABEL,
  ROLL_UPS_BREAKDOWN_LABEL_CONTRACTOR,
  ROLL_UPS_BREAKDOWN_LABEL_FULL_TIME,
  ROLL_UPS_BREAKDOWN_LABEL_INTERN,
  ROLL_UPS_BREAKDOWN_LABEL_PARTNER,
  ROLL_UPS_BREAKDOWN_LABEL_STUDENT,
  ROLL_UPS_LABEL,
  TITLE_LABEL,
  LINK_LABEL, ROLL_UPS_BREAKDOWN_LABEL,
} from "../../data/constants/OrgChart";
import FrontendRoutes from "../../data/constants/FrontendRoutes";

export default class BalkanOrgChart extends PureComponent {
  constructor(props) {
    super(props);
    this.divRef = createRef();
  }

  componentDidMount() {
    var children_count = 0;
    let fulltime_children_count_full_time,
      fulltime_children_count_contractor,
      fulltime_children_count_partner,
      fulltime_children_count_intern,
      fulltime_children_count_student = 0;

    OrgChart.templates.ula.field_7 =
      '<circle cx="60" cy="110" r="15" fill="#FA772E"></circle><text fill="#ffffff" x="60" y="115" text-anchor="middle">{val}</text>';
    OrgChart.templates.ula.field_0 =
      '<text width="140" text-overflow="ellipsis"  style="font-size: 18px;" fill="#1C1D22" x="160" y="40" text-anchor="middle">{val}</text>';
    OrgChart.templates.ula.field_1 =
      '<text width="140" text-overflow="multiline"  style="font-size: 14px;" fill="#363944" x="160" y="70" text-anchor="middle">{val}</text>';

    var chart = new OrgChart(this.divRef.current, {
      nodes: this.props.nodes,
      template: "ula",
      scaleInitial: 0.75,
      mouseScrool: OrgChart.action.zoom,
      layout: OrgChart.treeRightOffset,
      lazyLoading: true,
      enableDragDrop: false,
      align: OrgChart.ORIENTATION,
      zoom: {speed: 120, smooth: 6},
      toolbar: {
        fullScreen: true,
        zoom: true,
        fit: true,
        expandAll: true,
      },
      collapse: {
        level: 2,
        allChildren: true,
      },
      searchFields: [
        IMG_LABEL,
        NAME_LABEL,
        TITLE_LABEL,
        EMAIL_LABEL,
        DEPARTMENT_LABEL,
        LOCATION_LABEL,
        EMPLOYEE_TYPE_LABEL,
      ],
      nodeBinding: {
        img_0: IMG_LABEL,
        field_0: NAME_LABEL,
        field_1: TITLE_LABEL,
        field_2: EMAIL_LABEL,
        field_3: DEPARTMENT_LABEL,
        field_4: LOCATION_LABEL,
        field_5: EMPLOYEE_TYPE_LABEL,
        field_6: LINK_LABEL,
        field_7: DIRECT_REPORTS_TOTAL_LABEL,
        field_8: DIRECT_REPORTS_FULL_TIME_LABEL,
        field_9: DIRECT_REPORTS_CONTRACTOR_LABEL,
        field_10: DIRECT_REPORTS_PARTNER_LABEL,
        field_number_children2: ROLL_UPS_LABEL,
        field_number_children3: ROLL_UPS_BREAKDOWN_LABEL
      },
    });

    chart.editUI.on("field", function (sender, args) {
      if (args.name === ROLL_UPS_LABEL) {
        args.field.querySelector("input").value = children_count;
      }
      if (args.name === ROLL_UPS_BREAKDOWN_LABEL) {
        const inputElement = args.field.querySelector("input");
        inputElement.outerHTML = inputElement.outerHTML.replace(/input/g,"textarea");

        const textareaElement = args.field.querySelector("textarea");
        textareaElement.rows = '5';
        textareaElement.style.resize = 'none';
        textareaElement.value = `${ROLL_UPS_BREAKDOWN_LABEL_FULL_TIME}: ${fulltime_children_count_full_time}\n${ROLL_UPS_BREAKDOWN_LABEL_CONTRACTOR}: ${fulltime_children_count_contractor}\n${ROLL_UPS_BREAKDOWN_LABEL_PARTNER}: ${fulltime_children_count_partner}\n${ROLL_UPS_BREAKDOWN_LABEL_STUDENT}: ${fulltime_children_count_student}\n${ROLL_UPS_BREAKDOWN_LABEL_INTERN}: ${fulltime_children_count_intern}`;
      }
    });

    chart.editUI.on("show", function (sender, nodeId) {
      var children = {
        count: 0,
      };
      var fulltimechildren = {
        count: 0,
      };
      var partnerchildren = {
        count: 0,
      };
      var contractorchildren = {
        count: 0,
      };
      var internchildren = {
        count: 0,
      };
      var studentchildren = {
        count: 0,
      };

      childrenCount(children, nodeId);
      children_count = children.count;
      rollupChildrenCount(
        fulltimechildren,
        partnerchildren,
        contractorchildren,
        internchildren,
        studentchildren,
        nodeId
      );
      fulltime_children_count_full_time = fulltimechildren.count;
      fulltime_children_count_contractor = contractorchildren.count;
      fulltime_children_count_partner = partnerchildren.count;
      fulltime_children_count_intern = internchildren.count;
      fulltime_children_count_student = studentchildren.count;
    });

    function childrenCount(children, nodeId) {
      var node = chart.getNode(nodeId);

      for (var i = 0; i < node.childrenIds?.length; i++) {
        chart.get(node.childrenIds[i]);
        children.count++;
        childrenCount(children, node.childrenIds[i]);
      }
    }

    chart.editUI.on("field", function (sender, args) {
      var txt;
      if (args.name === "link") {
        txt = args.field.querySelector("input");
        if (txt) {
          txt.style.color = "black";

          var link = document.createElement("a");
          link.style.color = "blue";
          link.style.textDecoration = "underline";
          link.style.fontSize = "16px";
          link.innerHTML = "View user profile";
          link.target = "";
          link.href = FrontendRoutes.USER_DIRECTORY_PROFILE(txt.value);

          txt.parentNode.appendChild(link);
          txt.parentNode.removeChild(txt);
        }
      }
    });

    function rollupChildrenCount(
      fulltimechildren,
      partnerchildren,
      contractorchildren,
      internchildren,
      studentchildren,
      nodeId
    ) {
      var node = chart.getNode(nodeId);

      for (var i = 0; i < node.childrenIds?.length; i++) {
        var childNodeData = chart.get(node.childrenIds[i]);
        if (childNodeData[EMPLOYEE_TYPE_LABEL] != null) {
          if ("Full Time Employee" === childNodeData[EMPLOYEE_TYPE_LABEL]) {
            fulltimechildren.count++;
            rollupChildrenCount(
              fulltimechildren,
              partnerchildren,
              contractorchildren,
              internchildren,
              studentchildren,
              node.childrenIds[i]
            );
          }
          if ("Partner" === childNodeData[EMPLOYEE_TYPE_LABEL]) {
            partnerchildren.count++;
            rollupChildrenCount(
              fulltimechildren,
              partnerchildren,
              contractorchildren,
              internchildren,
              studentchildren,
              node.childrenIds[i]
            );
          }
          if ("Contractor/consultant" === childNodeData[EMPLOYEE_TYPE_LABEL]) {
            contractorchildren.count++;
            rollupChildrenCount(
              fulltimechildren,
              partnerchildren,
              contractorchildren,
              internchildren,
              studentchildren,
              node.childrenIds[i]
            );
          }
          if ("Student" === childNodeData[EMPLOYEE_TYPE_LABEL]) {
            studentchildren.count++;
            rollupChildrenCount(
              fulltimechildren,
              partnerchildren,
              contractorchildren,
              internchildren,
              studentchildren,
              node.childrenIds[i]
            );
          }
          if ("Intern" === childNodeData[EMPLOYEE_TYPE_LABEL]) {
            internchildren.count++;
            rollupChildrenCount(
              fulltimechildren,
              partnerchildren,
              contractorchildren,
              internchildren,
              studentchildren,
              node.childrenIds[i]
            );
          }
        }
      }
    }

    chart.editUI.on("field", function (sender, args) {
      var txt;

      if (args.name === DIRECT_REPORTS_TOTAL_LABEL) {
        txt = args.field.querySelector("input");
        if (txt.value === "0") {
          return false;
        }
      }

      if (args.name === DIRECT_REPORTS_PARTNER_LABEL) {
        txt = args.field.querySelector("input");
        if (txt.value === "0") {
          return false;
        }
      }

      if (args.name === DIRECT_REPORTS_CONTRACTOR_LABEL) {
        txt = args.field.querySelector("input");
        if (txt.value === "0") {
          return false;
        }
      }

      if (args.name === DIRECT_REPORTS_FULL_TIME_LABEL) {
        txt = args.field.querySelector("input");
        if (txt.value === "0") {
          return false;
        }
      }
    });
  }

  render() {
    return <div id="tree" ref={this.divRef} />;
  }
}
